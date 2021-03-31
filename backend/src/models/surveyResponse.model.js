const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("surveyResponse", {
        // 1 = valid
        // 0 = invalid
        valid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        place: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        feedbackNotes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        personalNotes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });