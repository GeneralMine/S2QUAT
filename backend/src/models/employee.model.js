const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("employee", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });