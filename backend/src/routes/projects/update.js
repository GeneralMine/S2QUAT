const controller = require("../../controller/projects")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { name, status, description, goal, projectStart, projectEnd, employee, scenarios, company, provides, users } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { name, status, description, goal, projectStart, projectEnd, employee, scenarios, company, provides, users }) });
    } catch (error) {
        return res.status(500).send();
    }
}