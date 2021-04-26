const model = require("../models/model.model");

const scenarioModel = require("../models/scenario.model");
const questionModel = require("../models/question.model");

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
        model: scenarioModel,
        as: "scenario",
    },
    {
        model: questionModel,
        as: "questions"
    }
]

async function startup() {
    model.belongsTo(scenarioModel, {
        foreignKey: "uses"
    });

    model.belongsToMany(questionModel, {
        through: 'consistsOf'
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, type, name, scenario, questions }) {
    return { id, type, name, scenario, questions };
}

function forExternalGet({ id, type, name, scenario, questions, createdAt, updatedAt }) {
    return { id, type, name, scenario, questions, createdAt, updatedAt };
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