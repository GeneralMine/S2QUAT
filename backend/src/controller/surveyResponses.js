const model = require("../models/surveyResponse.model");

const scenarioModel = require("../models/scenario.model");
const questionAnswerModel = require("../models/questionAnswer.model");
const testPersonModel = require("../models/testPerson.model");

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
        model: questionAnswerModel,
        as: "questionAnswers"
    },
    {
        model: testPersonModel,
        as: "testPerson"
    }
]

async function startup() {
    model.belongsTo(scenarioModel, {
        foreignKey: "evaluatedBy"
    });

    model.hasMany(questionAnswerModel, {
        foreignKey: "has"
    });

    model.hasOne(testPersonModel, {
        foreignKey: "filledOutBy"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, valid, date, place, feedbackNotes, personalNotes, scenario, questionAnswers, testPerson }) {
    return { id, valid, date, place, feedbackNotes, personalNotes, scenario, questionAnswers, testPerson };
}

function forExternalGet({ id, valid, date, place, feedbackNotes, personalNotes, scenario, questionAnswers, testPerson }) {
    return { id, valid, date, place, feedbackNotes, personalNotes, scenario, questionAnswers, testPerson };
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