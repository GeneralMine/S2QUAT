const controller = require("../../controller/testPersons")

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const userID = req.user !== undefined ? req.user.id : undefined;
    const { name, signature, age, gender } = req.body;

    if (name == null || name === "" || signature == null || signature === "") {
        return res.status(400).send();
    }

    try {
        return res.json({ id: await controller.insert(userID, { name, signature, age, gender }) });
    } catch (error) {
        return res.status(500).send();
    }
}