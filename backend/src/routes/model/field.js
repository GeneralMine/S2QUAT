const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    let { fieldId } = req.params;

    try {
        fieldId = parseInt(fieldId);

        if (fieldId === undefined) {
            return res.status(400).send();
        }

        const field = await prisma.field.findUnique({ where: { id: fieldId }, include: { attributes: { include: { factors: { include: { criterias: true } } } } } });

        return res.json({ field });
    } catch (err) {
        console.error("FIELD:", err);
        return res.status(400).send();
    }
}