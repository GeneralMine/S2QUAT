const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("scenario", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });