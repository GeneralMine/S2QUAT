/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let { fieldId } = req.params;

    if (fieldId === undefined) {
        return res.status(400).send();
    }

    try {
        fieldId = parseInt(fieldId);

        const field = await prisma.field.findUnique({ where: { id: fieldId }, include: { attributes: { include: { factors: { include: { criterias: true } } } } } });

        return res.json({ field });
    } catch (err) {
        console.error("FIELD:", err);
        return res.status(400).send();
    }
}