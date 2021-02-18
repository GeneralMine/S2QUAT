const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("questionAnswer", {
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });