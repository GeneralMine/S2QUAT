const controller = require("../../controller/surveyResponses")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { valid, date, place, feedbackNotes, personalNotes } = req.body;

    if (valid == null || valid === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { valid, date, place, feedbackNotes, personalNotes }) });
    } catch (error) {
        return res.status(500).send();
    }
}