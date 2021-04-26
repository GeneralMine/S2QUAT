const controller = require("../../controller/questionAnswers")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { score, text } = req.body;

    if ((score == null || score === "") && (text == null)) {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { score, text }) });
    } catch (error) {
        return res.status(500).send();
    }
}