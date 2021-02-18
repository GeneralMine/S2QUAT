const controller = require("../../controller/users");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send();
    }

    const { name, password, email } = req.body;

    if (name == null || name === "" || password == null || password === "" || email == null || email === "") {
        return res.status(400).send();
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return res.json({ id: await controller.insert(-1, { name, password: hashedPassword, email }) });
    } catch (error) {
        return res.status(500).send();
    }

}