const model = require("../models/scenario.model");

const modelModel = require("../models/model.model");
const projectModel = require("../models/project.model");
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
        model: projectModel,
        as: "project",
    },
    {
        model: modelModel,
        as: "model"
    },
    {
        model: surveyResponseModel,
        as: "surveyResponses"
    }
]

async function startup() {
    model.belongsTo(projectModel, {
        foreignKey: "contains"
    });

    model.hasOne(modelModel, {
        foreignKey: "uses"
    });

    model.hasMany(surveyResponseModel, {
        foreignKey: "evaluatedBy"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, description, project, model, surveyResponses }) {
    return { id, name, description, project, model, surveyResponses };
}

function forExternalGet({ id, name, description, project, model, surveyResponses, createdAt, updatedAt }) {
    return { id, name, description, project, model, surveyResponses, createdAt, updatedAt };
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