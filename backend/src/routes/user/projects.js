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

        let projects = await prisma.project.findMany(
            {
                include: {
                    company: true,
                    scenarios: true,
                    users: true
                },
                where: {
                    users: {
                        some: {
                            id: userId
                        }
                    }
                }
            });
        projects = projects.map(el => {
            el.users.map(usr => {
                delete usr.password;
                delete usr.last_logout;
                return usr;
            })
            return el;
        })
        return res.json({ projects });
    } catch (err) {
        return res.status(400).send();
    }
}