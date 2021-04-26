const model = require("../models/testPerson.model");

const surveyResponseModel = require("../models/surveyResponse.model");

const entityHandler = require("../lib/entityHandler");

module.exports = {
    startup,
    update,
    remove,
    get,
    insert,
    list,
    forExternalList,
    getStatistics
}

/**
 * Model Specific Configuration
 */

const include = [
    {
        model: surveyResponseModel,
        as: "surveyResponse",
    }
]

async function startup() {
    model.belongsTo(surveyResponseModel, {
        foreignKey: "filledOutBy"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, signature, age, gender, surveyResponse }) {
    return { id, name, signature, age, gender, surveyResponse };
}

function forExternalGet({ id, name, signature, age, gender, surveyResponse, createdAt, updatedAt }) {
    return { id, name, signature, age, gender, surveyResponse, createdAt, updatedAt };
}

/**
 * Generic Entity Functions
 */

async function update(userID, id, data) {
    return await entityHandler.updateInModel(model, include, userID, id, data);
}

async function remove(userID, id) {
    return await entityHandler.removeInModel(model, userID, id);
}

async function get(userID, id) {
    return await entityHandler.getInModel(model, include, forExternalGet, userID, id);
}

async function insert(userID, data) {
    return await entityHandler.insertToModel(model, userID, data);
}

async function list(userID) {
    return await entityHandler.listModel(model, include, forExternalList, userID);
}

async function getStatistics() {
    return await entityHandler.getStatisticsOfModel(model);
}