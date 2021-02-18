const controller = require("../../controller/testPersons")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { name, signature, age, gender, filledOutBy, surveyResponse } = req.body;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.update(userID, id, { name, signature, age, gender, filledOutBy, surveyResponse }) });
    } catch (error) {
        return res.status(500).send();
    }
}