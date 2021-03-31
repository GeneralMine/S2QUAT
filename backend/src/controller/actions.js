const model = require("../models/action.model");

module.exports = {
    startup,
    update,
    get,
    insert,
    list,
    getStatistics
}

async function startup() {
    console.log("Database: initialized", model.name);
}

function forExternalList(obj) {
    return obj;
}

async function update(id, data) {

    let action = await get(id);
    await action.reload();
    for (let key of Object.keys(data)) {
        action[key] = data[key];
    }
    await action.save();

    console.log("Updated action:\n" + JSON.stringify(action, null, 4));

    return true;
}

async function get(id) {
    const action = await model.findOne({ where: { id: id } });
    //console.log("Found action:\n" + JSON.stringify(action, null, 4));
    return action;
}

async function insert(actionName, user, entityName, entityID, status, original, changes, exception) {

    const action = await model.build({
        action: actionName,
        user,
        entityName,
        entityID,
        status,
        original,
        changes,
        exception
    })
    await action.save();
    //console.log("Inserted action:\n" + JSON.stringify(action, null, 4));

    return action.id;
}

async function list() {
    const all = await model.findAll({
        limit: 50,
        order: [
            ['id', 'DESC']]
    });
    console.log("List: got all " + all.length + " actions");

    let externalList = [];

    for (let item of all) {
        externalList.push(forExternalList(item));
    }

    return externalList;
}

async function getStatistics() {
    return "Database: Statistics of " + model.name + ": Entries: " + (await model.findAll()).length;
}