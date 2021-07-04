/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const { perform_login } = require("../../lib/_login_util");
const bcrypt = require("bcrypt");

/**
 * @typedef {object} ExtendWithUser
 * @property {import("@prisma/client").User} user
 *
 * @typedef {import("express").Request & ExtendWithUser} RequestWithUser
 */

/**
 * @param {ExtendWithUser} request
 * @param {Response} response
 */
module.exports = async (request, response) => {
    let {
        projectName,
        projectDescription,
        projectGoal,
        company,
        status,
        projectStart,
        projectEnd
    } = request.body;

    try {
        const data = {};

        if (projectName !== undefined) data.projectName = projectName;
        if (projectDescription !== undefined) data.projectDescription = projectDescription;
        if (projectGoal !== undefined) data.projectGoal = projectGoal;
        if (company !== undefined) data.company = company;
        if (status !== undefined) data.status = status;
        if (projectStart !== undefined) data.projectStart = projectStart;
        if (projectEnd !== undefined) data.projectEnd = projectEnd;

        const updatedUser = await prisma.user.update({ where: { id: current_user.id }, data });

        return perform_login(response, updatedUser);
    } catch (err) {
        console.error("while trying to update:", err);
        return response.status(401).send();
    }
}
