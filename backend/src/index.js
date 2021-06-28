require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./controller/database");

// env
const BACKEND_PORT = process.env.PORT || 8080;
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "localhost";
const isDebug = FRONTEND_DOMAIN.startsWith("localhost");

startup()
    .catch(err => {
        console.error(err);
    });

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
    await database.startup();

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
    if (!isDebug) {
        app.use(require("./middleware/sessionChecker"));
    }
    app.options("*", cors());

    /*
     * Public Routes
    */

    app.post("/users", require("./routes/users/insert"));
    app.post("/users/login", require("./routes/users/login"));

    /*
     * Private Routes
    */

    if (!isDebug) {
        console.log("***** Production Mode *****");
        app.use(require("./middleware/loggedInChecker"));
    }

    app.listen(BACKEND_PORT, () => {
        console.log(`Listening on http://localhost:${BACKEND_PORT}`);
    });
}