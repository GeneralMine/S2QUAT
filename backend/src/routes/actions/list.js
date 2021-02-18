const controller = require("../../controller/actions");

module.exports = async (req, res) => {
    return res.json(await controller.list());
}