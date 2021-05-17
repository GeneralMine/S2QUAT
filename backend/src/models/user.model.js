const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("user", {
        status: {
            /*
             * 0 = aktiv
             * 1 = deaktiviert
             * 2 = noch nicht verifiziert
            */
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        roles: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        session: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });