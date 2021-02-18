const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("testPerson", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        signature: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gender: {
            /*
             * male
             * female
             * ...
            */
            type: DataTypes.TEXT,
            allowNull: true
        }
    });