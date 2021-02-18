const { db } = require("../controller/database");
const { DataTypes } = require('sequelize');

module.exports =
    db.define("action", {
        action: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        entityName: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        entityID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            /**
             * -1 = pending
             * 0  = successful
             * 1  = error
             * 
             */
            type: DataTypes.INTEGER,
            allowNull: false
        },
        original: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        changes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        exception: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });