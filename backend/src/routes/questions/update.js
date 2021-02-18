const controller = require("../../controller/questions")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { name, description, depth, models, parent, questionAnswers } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { name, description, depth, models, parent, questionAnswers }) });
    } catch (error) {
        return res.status(500).send();
    }
}