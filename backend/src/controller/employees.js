const model = require("../models/employee.model");

const companieModel = require("../models/company.model");
const projectModel = require("../models/project.model");

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
        model: companieModel,
        as: "company",
    },
    {
        model: projectModel,
        as: "project"
    },
]

async function startup() {
    model.belongsTo(companieModel, {
        foreignKey: "employs"
    });

    model.belongsTo(projectModel, {
        foreignKey: "supervising"
    });

    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, email, phoneNumber, company, project, substitutedBy, substitutes }) {
    return { id, name, email, phoneNumber, company, project, substitutedBy, substitutes };
}

function forExternalGet({ id, name, email, phoneNumber, company, project, substitutedBy, substitutes, createdAt, updatedAt }) {
    return { id, name, email, phoneNumber, company, project, substitutedBy, substitutes, createdAt, updatedAt };
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