const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("questionAnswer", {
        type: {
            /**
             * 0 all possible fields
             * 1 score only
             * 2 text only
             */
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });