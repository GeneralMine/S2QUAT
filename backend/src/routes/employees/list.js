const controller = require("../../controller/employees");

module.exports = async (req, res) => {
    const userID = req.user !== undefined ? req.user.id : undefined;

    try {
        return res.json(await controller.list(userID));
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}