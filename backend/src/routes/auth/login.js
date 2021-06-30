const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN;

module.exports = async (req, res) => {
    const { email, password } = req.body;

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
        case 0:
            // User is active
            break;
        case 1:
            // User is deactivated
            console.error("LOGIN: user is deactivated!");
            return res.status(410).send();
        case 2:
            // User is not verified  ja der loggt net aus. Wir müssen also in der middleware checken!
            console.error("LOGIN: user is not verified!");
            return res.status(403).send();
        default:
            // Wtf shouldnt happen lol
            console.error("Unknown error at routes/users/login.js");
            return res.status(418).send();
    }

    const externalUser = controller.forExternalLogin(user);

    // generate json web token
    const token = jwt.sign(externalUser, TOKEN_SECRET);

    var date = new Date();
    date.setDate(date.getDate() + 7);
    res.cookie("token", token, {
        domain: ROOT_DOMAIN,
        expires: date,
        //maxAge: date,
        secure: true
    });

    res.json({ user: externalUser });
    console.log("LOGIN: User " + user.name + " logged in successfully!");
}