const controller = require("../../controller/questionAnswers")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { type, score, text } = req.body;

    if (score == null || score === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { type, score, text }) });
    } catch (error) {
        return res.status(500).send();
    }
}