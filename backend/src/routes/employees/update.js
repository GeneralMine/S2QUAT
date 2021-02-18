const controller = require("../../controller/employees")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { name, phoneNumber, email, company, project, substitutedBy, substitutes } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { name, phoneNumber, email, company, project, substitutedBy, substitutes }) });
    } catch (error) {
        return res.status(500).send();
    }
}