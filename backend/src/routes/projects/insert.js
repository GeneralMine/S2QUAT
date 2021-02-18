const controller = require("../../controller/projects")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { name, status, description, goal, projectStart, projectEnd } = req.body;

    if (name == null || name === "" || status == null) {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { name, status, description, goal, projectStart, projectEnd }) });
    } catch (error) {
        return res.status(500).send();
    }
}