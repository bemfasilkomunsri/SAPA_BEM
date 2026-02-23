const { Sequelize } = require("sequelize");
const db = require("../config/db.js");

const { DataTypes } = Sequelize;

const Users = db.define("users", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

}, {

    freezeTableName: true,
    timestamps: false

});

module.exports = Users;
