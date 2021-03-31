const controller = require("../../controller/surveys");

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { age, gender, name, questionAnswers, signature, scenarioId } = req.body;

    if (signature === undefined || signature !== true) {
        return res.status(400);
    }

    // TODO: hash or no hash? the question of existance

    try {
        // return new surveyResponse Id
        return res.json({ id: await controller.insert(userID, { age, gender, name, questionAnswers, signature, scenarioId }) });
    } catch (error) {
        return res.status(500).send();
    }
}