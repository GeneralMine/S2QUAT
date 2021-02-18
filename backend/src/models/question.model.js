const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("question", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        depth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });