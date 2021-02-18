const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("model", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });