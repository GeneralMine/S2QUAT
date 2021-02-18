const model = require("../models/companie.model");

const employeeModel = require("../models/employee.model");
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
        model: employeeModel,
        as: "employees",
    },
    {
        model: projectModel,
        as: "projects"
    }
]

async function startup() {
    model.hasMany(employeeModel, {
        foreignKey: "employs"
    });
    model.hasMany(projectModel, {
        foreignKey: "provides"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, logo, projects, employees }) {
    return { id, name, logo, projects, employees };
}

function forExternalGet({ id, name, logo, projects, employees }) {
    return { id, name, logo, projects, employees };
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