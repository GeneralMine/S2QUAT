/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("../../lib/db");

const bcrypt = require("bcrypt");
const { perform_login } = require("../../lib/_login_util");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim();

    if (email == null || email === "" || password == null || password === "") {
        console.error("LOGIN: email or password is null!");
        return res.status(400).send();
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    console.log("Got user", user);

    if (user == null || !(await bcrypt.compare(password, user.password))) {
        // if passwords not matching!
        console.error("LOGIN: credentials not matching!");
        return res.status(401).send();
    }
    // Passwords match!

    switch (user.status) {
        case "ACTIVE":
            // User is active
            break;
        case "DEACTIVATED":
            // User is deactivated
            console.error("LOGIN: user is deactivated!");
            return res.status(410).send();
        case "NOT_VERIFIED":
            // User is not verified  ja der loggt net aus. Wir müssen also in der middleware checken!
            console.error("LOGIN: user is not verified!");
            return res.status(403).send();
        default:
            // Wtf shouldnt happen lol
            console.error("Unknown error at routes/auth/login.js");
            return res.status(418).send();
    }

    perform_login(res, user);

    console.log("LOGIN: User " + user.name + " logged in successfully!");
}
