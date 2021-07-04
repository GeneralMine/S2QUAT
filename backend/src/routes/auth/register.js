/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const bcrypt = require("bcrypt");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let { name, password, email } = req.body;
    name = name.trim();
    email = email.trim();

    if (name == null || name === "" || password == null || password === "" || email == null || email === "") {
        return res.status(400).send();
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                email,
            }
        });
        console.log("Successfully created user" + createdUser.id);
        return res.json({ id: createdUser.id });
    } catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}