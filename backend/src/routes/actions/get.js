const controller = require("../../controller/actions");

module.exports = async (req, res) => {
    const { id } = req.params;

    if (id == null || id === "") {
        return res.status(400).send();
    }

    try {
        return res.json(await controller.get(id));
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}
