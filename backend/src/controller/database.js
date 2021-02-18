const { Sequelize } = require('sequelize');
const { sleep } = require('../lib/utils');

module.exports = {
    db: undefined,

    async startup() {
        let connected = false;
        while (!connected) {
            console.log("Database: Trying to connect to db at " + process.env.DATABASE_DIALECT + "://" + process.env.DATABASE_USERNAME + ":" + process.env.DATABASE_PASSWORD + "@" + process.env.DATABASE_HOST + ":" + process.env.DATABASE_PORT);

            try {
                this.db = new Sequelize(process.env.DATABASE_DATABASENAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
                    host: process.env.DATABASE_HOST,
                    port: process.env.DATABASE_PORT,
                    dialect: process.env.DATABASE_DIALECT,
                    logging: false,
                });

                await this.db.authenticate();
                console.log('Database: Connection has been established successfully.');
                console.log('Database: Creation complete!');
                connected = true;
            } catch (error) {
                try {
                    this.db = new Sequelize('', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
                        host: process.env.DATABASE_HOST,
                        port: process.env.DATABASE_PORT,
                        dialect: process.env.DATABASE_DIALECT,
                        logging: false
                    });
                    await this.db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_DATABASENAME}`);
                    await this.db.query(`USE ${process.env.DATABASE_DATABASENAME}`);
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
        await this.db.sync();

        console.log("Database: Startup complete!");

        controllers.forEach(async (controller) => { console.log(await controller.getStatistics()) });
    },
    async use() {
        await this.db.query("USE " + process.env.DATABASE_DATABASENAME);
    },
}
