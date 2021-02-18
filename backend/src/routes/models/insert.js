const controller = require("../../controller/models")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { name } = req.body;

    if (name == null || name === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { name }) });
    } catch (error) {
        return res.status(500).send();
    }
}