const database = require("../controller/database");
const actionsController = require("../controller/actions");
const lib = require("./utils");

module.exports = {
    async startupEntity(model) {
        console.log("Database: initialized", model.name);
    },
    async insertToModel(model, userID = -1, data) {
        const actionID = await this.logAction("insert", userID, model.name, -1, -1, {}, data, {});

        try {
            const item = await model.build(data);
            await item.save();

            console.log("Inserted:\n" + JSON.stringify(item, null, 4));
            await this.updateAction(actionID, { entityID: item.id })
            await this.setActionStatusSuccessful(actionID);

            return item.id;
        } catch (error) {
            await this.setActionStatusError(actionID, error);

            throw new Error(error);
        }
    },
    async getInModel(model, include, forExternalGet, userID, id) {
        const actionID = await this.logAction("get", userID, model.name, id, -1, {}, {}, {});
        try {
            const item = await model.findOne({ where: { id }, include });
            if (item == null) {
                throw new Error("Entry does not exist!");
            }
            console.log("Get:\n" + JSON.stringify(item, null, 4));
            await this.setActionStatusSuccessful(actionID);

            return forExternalGet(item);
        } catch (error) {
            await this.setActionStatusError(actionID, error);
            throw new Error(error);
        }
    },
    async updateInModel(model, include, userID, id, data) {
        const actionID = await this.logAction("update", userID, model.name, id, -1, {}, data, {});
        try {
            let item = await model.findOne({ where: { id }, include });
            if (item == null) {
                throw new Error("Entry does not exist!");
            }
            let original = {};
            for (let key of Object.keys(data).filter(el => data[el] !== undefined)) {
                original[key] = item[key];
                let dataEntry = data[key];
                // If is object/relationship
                if (typeof dataEntry === 'object' && dataEntry !== null) {
                    //console.log("Got an object", dataEntry);
                    let tempEntityName = Object.keys(dataEntry)[0];
                    //console.log("The data at the key", tempEntityName, "is", dataEntry[tempEntityName]);
                    let dataEntryValue = dataEntry[tempEntityName]
                    // If the objects value is an array -> 1:n relationship
                    //console.log("Setting " + tempEntityName + " to", dataEntryValue);
                    if (Array.isArray(dataEntryValue)) {
                        //console.log("the entity name is", tempEntityName);
                        let newRelationshipArray = [];
                        for (const dataEntryValueItem of dataEntryValue) {
                            newRelationshipArray.push(await database.db.model(tempEntityName).findOne({ where: { id: dataEntryValueItem } }));
                        }
                        //console.log("newRelationshipArray is", newRelationshipArray);
                        //console.log("Calling: " + "set" + lib.capitalizeFirstLetter(key))
                        //console.log(lib.getMethods(item));
                        await item["set" + lib.capitalizeFirstLetter(key)](newRelationshipArray);
                    }
                    // Objects value is just one value -> 1:1 relationship
                    else {
                        //console.log("Got db", database.db);
                        //console.log("Got model from db", database.db.model(tempEntityName));
                        //console.log("Got tempEntityName", tempEntityName);
                        let relationshipObject = dataEntryValue !== null ? await database.db.model(tempEntityName).findOne({ where: { id: dataEntryValue } }) : null;
                        //console.log("Found relationship object", relationshipObject);
                        //console.log("Calling: ", "set" + lib.capitalizeFirstLetter(key));
                        await item["set" + lib.capitalizeFirstLetter(key)](relationshipObject);
                        //console.log("set " + dataEntryValue + " as " + key);
                        //console.log(item);
                    }
                }
                // Just a attribute to update
                else {
                    item[key] = dataEntry;
                }
            }

            //console.log("item", item);
            //console.log("original", original);
            //console.log("data", data);

            await this.updateAction(actionID, { original: JSON.stringify(original) });
            await item.save();

            await this.setActionStatusSuccessful(actionID);
            console.log("Update:\n" + JSON.stringify(item, null, 4));

            return item.id;
        } catch (error) {
            await this.setActionStatusError(actionID, error);
            throw new Error(error);
        }
    },
    async removeInModel(model, userID, id) {
        const actionID = await this.logAction("remove", userID, model.name, id, -1, {}, {}, {});

        try {
            let item = await model.findOne({ where: { id } });
            if (item == null) {
                throw new Error("Entry does not exist!");
            }
            await this.updateAction(actionID, { original: JSON.stringify(item) });

            await item.destroy();

            await this.setActionStatusSuccessful(actionID);
            console.log("Remove:\n" + JSON.stringify(item, null, 4));

            return true;
        } catch (error) {
            await this.setActionStatusError(actionID, error);
            throw new Error(error);
        }
    },
    async listModel(model, includes, forExternalList, userID) {
        const actionID = await this.logAction("list", userID, model.name, null, -1, {}, {}, {});
        try {
            const all = await model.findAll({
                include: includes
            });
            console.log("List: got all " + all.length + " " + model.name);

            let externalList = [];
            for (let item of all) {
                externalList.push(forExternalList(item));
            }
            await this.setActionStatusSuccessful(actionID);

            return externalList;
        } catch (error) {
            await this.setActionStatusError(actionID, error);
            throw new Error(error);
        }
    },
    async getStatisticsOfModel(model) {
        return "Database: Statistics of " + model.name + ": Entries: " + (await model.findAll()).length;
    },
    /**
     * Action functions
     */
    async logAction(actionName, user, entityName, entityID, status, original, changes, exception) {
        return await actionsController.insert(actionName, user, entityName, entityID, status, JSON.stringify(original), JSON.stringify(changes), JSON.stringify(exception));
    },
    async setActionStatusSuccessful(actionID) {
        return await actionsController.update(actionID, {
            status: 0
        });
    },
    async setActionStatusError(actionID, error) {
        return await actionsController.update(actionID, {
            status: 1,
            exception: JSON.stringify({ message: error.message, stack: error.stack })
        });
    },
    async updateAction(actionID, data) {
        return await actionsController.update(actionID, data);
    }
}