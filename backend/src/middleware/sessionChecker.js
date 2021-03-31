const userController = require("../controller/users");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET || "d3ac10209c78b071e9a00791904cabe21fe5f0fdc2a91a9a6b54ec0ebe2b8e8b275dc7c7579a85468e4abd7b1c18c38a0f8889668e9ec66cf58245bd5b0b665e";

module.exports = async (req, res, next) => {
    if (req.url === ("/users/login" || req.url === "/users/register")) {
        return next();
    }
    const { token } = req.cookies;

    if (token === undefined) {
        console.error("AUTH: User does not have a token, he may not be logged in!");
        return res.status(404).send();
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET);

        if (decodedToken === undefined) {
            console.error("AUTH: decodedToken is null!");
            return res.status(404).send();
        }
        const userFromDB = await userController.getLogin(decodedToken.id, decodedToken.id);

        if (userFromDB === undefined) {
            console.error("AUTH: userFromDB is null!");
            return res.status(404).send();
        }

        if (decodedToken.session === userFromDB.session) {
            switch (userFromDB.status) {
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

            req.user = userFromDB;
            console.log("AUTH: User logged in!");
        } else {
            console.error("AUTH: session invalid!");
            return res.status(401).send();
        }
    } catch (error) {
        console.error("[ERROR]", error.message);
        return res.status(404).send();
    }
    return next();
}
