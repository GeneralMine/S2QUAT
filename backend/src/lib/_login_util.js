const jwt = require("jsonwebtoken");
const { forExternal } = require("./utils");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ROOT_DOMAIN = "." + process.env.ROOT_DOMAIN;

function generate_token(user) {
    const externalUser = forExternal(user);
    const token = jwt.sign(externalUser, TOKEN_SECRET);
    return token;
}

function perform_login(res, u) {
    const ex_user = forExternal(u);
    const token = generate_token(u);

    res.json({ user: ex_user, token });
}

module.exports = { perform_login }