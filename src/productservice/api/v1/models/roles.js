const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    underscored: true,
    timestamp: true,
})

module.exports = Role;