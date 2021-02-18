const controller = require("../../controller/companies")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { name, logo, employees, projects } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { name, logo, employees, projects }) });
    } catch (error) {
        return res.status(500).send();
    }
}