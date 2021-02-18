const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("company", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });