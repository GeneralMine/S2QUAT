const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    let { userId } = req.params;

    if (userId === undefined) {
        return res.status(400).send();
    }

    const projects = await prisma.project.findMany({ include: { Company: true }, where: { Users: { some: { id: userId } } } });

    return res.json({ projects });
}