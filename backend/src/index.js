require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./lib/db");
const dbtester = require("./lib/dbtester");
// env
const BACKEND_PORT = process.env.PORT || 8080;
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "localhost";
const isDebug = FRONTEND_DOMAIN.startsWith("localhost");

const corsOptionsProduction = {
    methods: "GET, OPTIONS, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
    origin: ["https://raiser.dev", /\.raiser\.dev$/]
};
const corsOptionsDebug = {
    origin: function (origin, callback) { return callback(null, true); },
    optionsSuccessStatus: 200,
    credentials: true
};

async function startup() {
    await dbtester();
    app.enable('trust proxy');
    app.use(express.json());
    if (!isDebug) {
        app.use(cors(corsOptionsProduction));
        console.log("CORS loaded in production!");
    } else {
        app.use(cors(corsOptionsDebug));
        console.log("CORS loaded in debug!");
    }
    app.use(cookieParser());
    app.use(require("./middleware/sessionChecker"));
    app.options("*", cors());

    /*
     * Public Routes
     */

    app.post("/auth/register", require("./routes/auth/register"));
    app.post("/auth/login", require("./routes/auth/login"));
    app.post("/auth/logout", require("./routes/auth/logout"));

    /*
     * Private Routes
     */

    if (!isDebug) {
        console.log("***** Production Mode *****");
        app.use(require("./middleware/loggedInChecker"));
    }

    app.get("/user/:userId/projects", require("./routes/user/projects"));
    app.get("/model/field/:fieldId", require("./routes/model/field"));

    app.listen(BACKEND_PORT, () => {
        console.log(`Listening on http://localhost:${BACKEND_PORT}`);
    });
}

startup()
    .catch(err => {
        console.error(err);
    });