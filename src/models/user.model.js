const {Sequelize, DataTypes} = require('sequelize')
const seq = require('../db/seq');

const User = seq.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.CHAR(64),
        // allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        defaultValue:0,
    }
},{
    // real table name
    modelName: 'users'
})
// if the table is not exist, the table will be created by default
User.sync()
module.exports = User
