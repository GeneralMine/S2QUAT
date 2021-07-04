const jwt = require("jsonwebtoken");
const ms = require("ms");
const { forExternal } = require("./utils");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ROOT_DOMAIN = "." + process.env.ROOT_DOMAIN;

function generate_token(user) {
    const externalUser = forExternal(user);
    const token = jwt.sign(externalUser, TOKEN_SECRET);
    return token;
}

/**
 * @param {import("express").Response} res
 * @param {import("@prisma/client").User} u
 */
function perform_login(res, u) {
    const ex_user = forExternal(u);
    const token = generate_token(u);

    res
        .cookie("token", token, {
            maxAge: ms("7 days"),
            domain: "api.app.localhost:3000",
            sameSite: "lax",
            secure: false,
            httpOnly: true
        })
        .json({ user: ex_user, token });
}

module.exports = { perform_login }