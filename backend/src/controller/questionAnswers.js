const model = require("../models/questionAnswer.model");

const questionModels = require("../models/question.model");
const surveyResponseModel = require("../models/surveyResponse.model");

const entityHandler = require("../lib/entityHandler");

module.exports = {
    startup,
    list,
    insert,
    get,
    remove,
    update,
    forExternalList,
    getStatistics
}

/**
 * Model Specific Configuration
 */

const include = [
    {
        model: questionModels,
        as: "questions",
    },
    {
        model: surveyResponseModel,
        as: "surveyResponse"
    }
]

async function startup() {
    model.belongsToMany(questionModels, {
        through: 'answers'
    });

    model.belongsTo(surveyResponseModel, {
        foreignKey: "has"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, type, score, text, questions, surveyResponse }) {
    return { id, type, score, text, questions, surveyResponse };
}

function forExternalGet({ id, type, score, text, questions, surveyResponse }) {
    return { id, type, score, text, questions, surveyResponse };
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