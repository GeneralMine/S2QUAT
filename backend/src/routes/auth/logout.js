/** @type {import("@prisma/client").PrismaClient} */
const db = require("../../lib/db");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    res.clearCookie("token");

    if (req.user === undefined) {
        console.error("LOGOUT: req.user is null!");
        return res.status(401).send();
    }

    try {
        const rewritten = await prisma.user.update({ where: { id: req.user.id }, data: { last_logout: Date.now() } })

        console.log("LOGOUT: User " + req.user.name + " logged out successfully!");
        await res.clearCookie("token");
        return res.status(200).send();
    } catch (err) {
        console.error(`CRITICAL! User ${req.user.name} could not be logged out!`);
        return res.status(500).send();
    }
}