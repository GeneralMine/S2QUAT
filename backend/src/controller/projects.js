const model = require("../models/project.model");

const companieModel = require("../models/company.model");
const employeeModel = require("../models/employee.model");
const scenarioModel = require("../models/scenario.model");
const userModel = require("../models/user.model");

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
        model: userModel,
        as: "users",
    },
    {
        model: companieModel,
        as: "company"
    },
    {
        model: employeeModel,
        as: "employee"
    },
    {
        model: scenarioModel,
        as: "scenarios"
    }
]

async function startup() {
    model.belongsToMany(userModel, {
        through: 'workingOn'
    });

    model.belongsTo(companieModel, {
        foreignKey: "provides"
    });

    model.hasOne(employeeModel, {
        foreignKey: "supervising"
    });

    model.hasMany(scenarioModel, {
        foreignKey: "contains"
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, name, status, projectStart, projectEnd, users, company, employee, scenarios }) {
    return { id, name, status, projectStart, projectEnd, users, company, employee, scenarios };
}

function forExternalGet({ id, name, status, projectStart, projectEnd, goal, description, users, company, employee, scenarios, createdAt, updatedAt }) {
    return { id, name, status, projectStart, projectEnd, goal, description, users, company, employee, scenarios, createdAt, updatedAt };
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