const model = require("../models/question.model");

const modelModel = require("../models/model.model");
const questionAnswerModel = require("../models/questionAnswer.model");

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
        model: model,
        as: "parent",
    },
    {
        model: modelModel,
        as: "models"
    },
    {
        model: questionAnswerModel,
        as: "questionAnswers"
    }
]

async function startup() {
    model.belongsTo(model, {
        as: "parent",
    });

    model.belongsToMany(modelModel, {
        through: 'consistsOf'
    });

    model.belongsToMany(questionAnswerModel, {
        through: "answers"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, description, depth, parent, models, questionAnswers }) {
    return { id, name, description, depth, parent, models, questionAnswers };
}

function forExternalGet({ id, name, description, depth, parent, models, questionAnswers }) {
    return { id, name, description, depth, parent, models, questionAnswers };
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