const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/** @type {import("express").Handler} */
module.exports = async (req, res, next) => {
    const { token } = req.cookies;

    if (token === undefined) {
        console.error("AUTH: User does not have a token, he may not be logged in!");
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET);

        if (decodedToken === undefined) {
            console.error("AUTH: User is not logged in (failed to decode)!");
            resetToken();
            return next();
        }

        const my_user = await prisma.user.findUnique({ where: { id: decodedToken.id }, select: { password: false } });

        if (my_user === undefined) {
            console.error("AUTH: User does not exist!");
            resetToken();
            return next();
        }

        if (my_user.last_logout.valueOf() < decodedToken.iat) {
            switch (my_user.status) {
                case "ACTIVE":
                    // User is active
                    break;
                case "DEACTIVATED":
                    // User is deactivated
                    console.error("LOGIN: user is deactivated!");
                    resetToken();
                    return res.status(410).send();
                case "NOT_VERIFIED":
                    // User is not verified  ja der loggt net aus. Wir müssen also in der middleware checken!
                    console.error("LOGIN: user is not verified!");
                    resetToken();
                    return res.status(403).send();
                default:
                    // Wtf shouldnt happen lol
                    console.error("Unknown error at routes/auth/login.js");
                    return res.status(418).send();
            }

            req.user = my_user;
            console.log("AUTH: User logged in!");
        } else {
            console.error("AUTH: session invalid!");
            resetToken();
        }
    } catch (error) {
        console.error("[ERROR]", error.message);
    }

    function resetToken() {
        res.clearCookie("token");
    }

    return next();
}
