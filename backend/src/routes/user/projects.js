/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let { userId } = req.params;

    if (userId === undefined) {
        return res.status(400).send();
    }

    try {
        userId = parseInt(userId);

        const projects = await prisma.project.findMany(
            {
                include: {
                    Company: true,
                    Scenarios: true,
                    Users: true
                },
                where: {
                    Users: {
                        some: {
                            id: userId
                        }
                    }
                }
            });
        return res.json({ projects });
    } catch (err) {
        return res.status(400).send();
    }
}