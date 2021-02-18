require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const database = require("./controller/database");

const isDebug = process.env.FRONTEND_DOMAIN.startsWith("localhost");

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

    // actions
    app.get("/actions", require("./routes/actions/list"));
    app.get("/actions/:id", require("./routes/actions/get"));

    // companies
    app.get("/companies", require("./routes/companies/list"));
    app.post("/companies", require("./routes/companies/insert"));
    app.post("/companies/:id", require("./routes/companies/update"));
    app.get("/companies/:id", require("./routes/companies/get"));
    app.delete("/companies/:id", require("./routes/companies/remove"));

    // employees
    app.get("/employees", require("./routes/employees/list"));
    app.post("/employees", require("./routes/employees/insert"));
    app.post("/employees/:id", require("./routes/employees/update"));
    app.get("/employees/:id", require("./routes/employees/get"));
    app.delete("/employees/:id", require("./routes/employees/remove"));

    // models
    app.get("/models", require("./routes/models/list"));
    app.post("/models", require("./routes/models/insert"));
    app.post("/models/:id", require("./routes/models/update"));
    app.get("/models/:id", require("./routes/models/get"));
    app.delete("/models/:id", require("./routes/models/remove"));

    // projects
    app.get("/projects", require("./routes/projects/list"));
    app.post("/projects", require("./routes/projects/insert"));
    app.post("/projects/:id", require("./routes/projects/update"));
    app.get("/projects/:id", require("./routes/projects/get"));
    app.delete("/projects/:id", require("./routes/projects/remove"));

    // questionAnswers
    app.get("/questionAnswers", require("./routes/questionAnswers/list"));
    app.post("/questionAnswers", require("./routes/questionAnswers/insert"));
    app.post("/questionAnswers/:id", require("./routes/questionAnswers/update"));
    app.get("/questionAnswers/:id", require("./routes/questionAnswers/get"));
    app.delete("/questionAnswers/:id", require("./routes/questionAnswers/remove"));

    // questions
    app.get("/questions", require("./routes/questions/list"));
    app.post("/questions", require("./routes/questions/insert"));
    app.post("/questions/:id", require("./routes/questions/update"));
    app.get("/questions/:id", require("./routes/questions/get"));
    app.delete("/questions/:id", require("./routes/questions/remove"));

    // scenarios
    app.get("/scenarios", require("./routes/scenarios/list"));
    app.post("/scenarios", require("./routes/scenarios/insert"));
    app.post("/scenarios/:id", require("./routes/scenarios/update"));
    app.get("/scenarios/:id", require("./routes/scenarios/get"));
    app.delete("/scenarios/:id", require("./routes/scenarios/remove"));

    // surveyResponses
    app.get("/surveyResponses", require("./routes/surveyResponses/list"));
    app.post("/surveyResponses", require("./routes/surveyResponses/insert"));
    app.post("/surveyResponses/:id", require("./routes/surveyResponses/update"));
    app.get("/surveyResponses/:id", require("./routes/surveyResponses/get"));
    app.delete("/surveyResponses/:id", require("./routes/surveyResponses/remove"));

    // testPersons
    app.get("/testPersons", require("./routes/testPersons/list"));
    app.post("/testPersons", require("./routes/testPersons/insert"));
    app.post("/testPersons/:id", require("./routes/testPersons/update"));
    app.get("/testPersons/:id", require("./routes/testPersons/get"));
    app.delete("/testPersons/:id", require("./routes/testPersons/remove"));

    // users
    app.get("/users", require("./routes/users/list"));
    app.get("/users/:id", require("./routes/users/get"));
    app.post("/users/:id", require("./routes/users/update"));
    app.post("/users/:id/logout", require("./routes/users/logout"));
    app.delete("/users/:id", require("./routes/users/remove"));

    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}