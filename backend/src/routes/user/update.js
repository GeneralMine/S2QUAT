/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const { forExternal } = require("../../lib/utils");
const { perform_login } = require("../../lib/_login_util");

/**
 * @typedef {object} ExtendWithUser
 * @property {import("@prisma/client").User} user
 *
 * @typedef {import("express").Request & ExtendWithUser} RequestWithUser
 */

/**
 * @param {ExtendWithUser} req
 * @param {Response} res
 */
module.exports = async (req, res) => {
    let { email, password, name } = req.body;

    console.log(req.user);

    try {
        let current_user = req.user;
        const result = await prisma.user.update({ where: { id: current_user.id }, data: { name, email, password } });

        if (current_user.name !== result.name || current_user.email !== result.email) {
            return perform_login(res, result);
        }
    } catch (err) {
        console.error("while trying to update:", err);
        return res.status(401).send();
    }
}
