/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const { forExternal } = require("../../lib/utils");
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
    let { name, email, password } = request.body;

    try {
        let current_user = request.user;
        let data = {};
        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({ where: { id: current_user.id }, data });

        return perform_login(response, updatedUser);
    } catch (err) {
        console.error("while trying to update:", err);
        return response.status(401).send();
    }
}
