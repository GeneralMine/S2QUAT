const controller = require("../../controller/questions")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { name, description, depth } = req.body;

    if (name == null || name === "" || depth == null || depth === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { name, description, depth }) });
    } catch (error) {
        return res.status(500).send();
    }
}