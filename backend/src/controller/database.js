const { Sequelize } = require('sequelize');
const { sleep } = require('../lib/utils');

const DATABASE_DATABASENAME = process.env.DATABASE_DATABASENAME || "s2quat";
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || "mariadb";
module.exports = {
    db: undefined,

    async startup() {
        let connected = false;
        while (!connected) {
            console.log("Database: Trying to connect to db at " + DATABASE_DIALECT + "://" + DATABASE_USERNAME + ":" + DATABASE_PASSWORD + "@" + DATABASE_HOST + ":" + DATABASE_PORT);

            try {
                this.db = new Sequelize(DATABASE_DATABASENAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
                    host: DATABASE_HOST,
                    port: DATABASE_PORT,
                    dialect: DATABASE_DIALECT,
                    logging: false,
                });

                await this.db.authenticate();
                console.log('Database: Connection has been established successfully.');
                console.log('Database: Creation complete!');
                connected = true;
            } catch (error) {
                try {
                    this.db = new Sequelize('', DATABASE_USERNAME, DATABASE_PASSWORD, {
                        host: DATABASE_HOST,
                        port: DATABASE_PORT,
                        dialect: DATABASE_DIALECT,
                        logging: false
                    });
                    await this.db.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_DATABASENAME}`);
                    await this.db.query(`USE ${DATABASE_DATABASENAME}`);
                    console.log("Database: Connected to create database. Reconnecting...");
                } catch (error) {
                    console.error('Unable to connect to the database');
                }
                await sleep(500)
            }
        }

        // Connected

        await this.use();

        /**
         * Add Entities for init here!
         */
        const controllers = [
            require("./actions"),
            require("./employees"),
            require("./questionAnswers"),
            require("./models"),
            require("./projects"),
            require("./questions"),
            require("./scenarios"),
            require("./surveyResponses"),
            require("./testPersons"),
            require("./companies"),
            require("./users")
        ];

        for (const controller of controllers) {
            await controller.startup();
        }
        console.log("Database: Startup complete!");
        await this.db.sync();

        console.log("Database: Sync complete!");

        controllers.forEach(async (controller) => { console.log(await controller.getStatistics()) });
    },
    async use() {
        await this.db.query("USE " + DATABASE_DATABASENAME);
    },
}
