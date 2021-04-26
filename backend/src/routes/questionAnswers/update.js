const controller = require("../../controller/questionAnswers")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { score, text, questions, surveyResponse } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { score, text, questions, surveyResponse }) });
    } catch (error) {
        return res.status(500).send();
    }
}