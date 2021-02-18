const controller = require("../../controller/users")
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { id } = req.params;
    const userID = req.user !== undefined ? req.user.id : undefined;

    const { status, name, email, roles, session, projects } = req.body;
    let password = req.body.password;

    if (id == null || id === "" || password === "") {
        return res.status(400).send();
    }

    if (password !== undefined && password != null && password !== "") {
        password = await bcrypt.hash(password, 10);
    }
    try {
        return res.json({ id: await controller.update(userID, id, { status, name, password, email, roles, session, projects }) });
    } catch (error) {
        return res.status(500).send();
    }
}