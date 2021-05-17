const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("model", {
        type: {
            /**
             * 0 all possible fields
             * 1 score only
             * 2 text only
             */
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isTemplate: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });