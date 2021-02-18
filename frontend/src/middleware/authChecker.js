const kv = require("kv-expire");
const jwt = require("jsonwebtoken");
const nodelib = require("../nodeLib");

const allowedRoutes = [
    "/login",
    "/register",
    "/impressum",
    "/about",
    "/privacy",
    "/favicon.ico",
    "/favicon.png",
    "/service-worker.js",
    "/service-worker-index.html",
    "/manifest.json",
    "/global.css",
    "/logo-512.png",
    "/logo-192.png",
    "/fraunhofer-iao.png",
    "/logo-width.png",
    "/loginPicture.jpg",
    "/robots.txt"
]

module.exports = (secret) => async (req, res, next) => {
    // Check if user is logged in

    if (secret == undefined) {
        throw new Error("Kacke scheiße, secret undefined!! son mist!");
    }
    const token = req.cookies.token;

    if (token != undefined) {
        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            return next();
        } catch (error) {
            console.error(error);
        }
    }

    // User is not logged in!

    // Stay on login/register page, not logged in but wants to
    if (allowedRoutes.includes(req.url) || req.url.startsWith("/client") || req.url.startsWith("/icons")) {
        //console.log("User is not logged in and on login or register, stay");
        return next();
    }

    // not logged and on wrong page, so redirect him to login!
    console.log(`Rejected request to ${req.url}`);

    let url = "/login";
    let str = `Redirecting to ${url}`;

    res.writeHead(302, {
        Location: url,
        'Content-Type': 'text/plain',
        'Content-Length': str.length
    });
    return res.end(str);
}
