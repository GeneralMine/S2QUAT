/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const { forExternal } = require("../../lib/utils");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN;

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
            return rewrite_token(req, res, updated);
        }
    } catch (err) {
        console.error("while trying to update:", err);
        return res.status(401).send();
    }
}

/**
 * @param {ExtendWithUser} req
 * @param {Response} res
 */
async function rewrite_token(req, res, updated) {
    let ex = forExternal(updated);

    const token = jwt.sign(externalUser, TOKEN_SECRET);

    let date = new Date();
    date.setDate(date.getDate() + 7);
    res.cookie("token", token, {
        domain: ROOT_DOMAIN,
        expires: date,
        //maxAge: date,
        secure: true
    });

    return res.json({ user: ex });
}