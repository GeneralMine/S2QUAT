const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("project", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            /*
             * 0 = inaktiv (noch nicht gestartet)
             * 1 = aktiv
             * 2 = archiviert/beendet
            */
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        goal: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        projectStart: {
            type: DataTypes.DATE,
            allowNull: true
        },
        projectEnd: {
            type: DataTypes.DATE,
            allowNull: true
        },
    });