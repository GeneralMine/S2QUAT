const controller = require("../../controller/surveyResponses")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { valid, date, place, feedbackNotes, personalNotes, evaluatedBy, questionAnswers, scenario, testPerson } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { valid, date, place, feedbackNotes, personalNotes, evaluatedBy, questionAnswers, scenario, testPerson }) });
    } catch (error) {
        return res.status(500).send();
    }
}