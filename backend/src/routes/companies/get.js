const controller = require("../../controller/companies");

module.exports = async (req, res) => {
    const { id } = req.params;

    const userID = req.user !== undefined ? req.user.id : undefined;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json(await controller.get(userID, id));
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}