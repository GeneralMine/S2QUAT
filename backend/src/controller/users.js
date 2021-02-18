const crypto = require("crypto");
const model = require("../models/user.model");

const projectModel = require("../models/project.model");

const entityHandler = require("../lib/entityHandler");

module.exports = {
    startup,
    update,
    remove,
    get,
    insert,
    list,
    getByName,
    getByID,
    addRole,
    removeRole,
    generateNewSession,
    forExternalList,
    forExternalLogin,
    getStatistics,
    getLogin
}

/**
 * Model Specific Configuration
 */

const include = [
    {
        model: projectModel,
        as: "projects",
    }
]

async function startup() {
    model.belongsToMany(projectModel, {
        through: 'workingOn'
    });
    await entityHandler.startupEntity(model);
}

function forExternalList({ id, status, name, email, roles, projects }) {
    return { id, status, name, email, roles, projects };
}

function forExternalGet({ id, status, name, email, roles, projects }) {
    return { id, status, name, email, roles, projects };
}

function forExternalLogin({ id, status, name, email, roles, session }) {
    return { id, status, name, email, roles, session };
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
    data.status = 2;
    data.roles = "";
    data.session = getRandomSession();
    return await entityHandler.insertToModel(model, userID, data);
}

async function list(userID) {
    return await entityHandler.listModel(model, include, forExternalList, userID);
}

async function getStatistics() {
    return await entityHandler.getStatisticsOfModel(model);
}

/**
 * Custom Entitiy Functions
 */

async function getByName(name) {

    const user = await model.findOne({ where: { name } });

    console.log("Found user:\n" + JSON.stringify(user, null, 4));

    return user;
}

async function getByID(id) {

    const user = await model.findOne({ where: { id } });

    console.log("Found user:\n" + JSON.stringify(user, null, 4));

    return user;
}

async function getLogin(userID, id) {
    return await entityHandler.getInModel(model, include, forExternalLogin, userID, id);
}

/**
 * Role Management
 */

async function addRole(id, role) {
    const user = await getByID(id);

    user.roles += "," + role;
    await user.save();

    return true;
}

async function removeRole(id, role) {
    const user = await getByID(id);

    let rolesArray = user.roles.split(",");
    rolesArray = rolesArray.filter(el => el !== role);
    await user.save();

    return true;
}

async function generateNewSession(id) {
    let user = await getByID(id);

    user.session = getRandomSession();
    await user.save();

    console.log("Generated new session for user:\n" + JSON.stringify(user, null, 4));
    return true;
}

/**
 * helper functions
**/

function getRandomSession() {
    return crypto.randomBytes(64).toString("hex")
}