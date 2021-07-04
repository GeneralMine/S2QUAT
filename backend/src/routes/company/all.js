/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

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
    try {
        const companies = await prisma.company.findMany();
        console.log(companies.map(el => el.name));
        return response.json({ companies });
    } catch (err) {
        console.error("error while getting all companies", err);
        return response.status(401).send();
    }
}
