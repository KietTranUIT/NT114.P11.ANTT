const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Brand = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    logo: {
        type: DataTypes.STRING,
        defaultValue: 'logo.jpg'
    },
}, {
    underscored: true,
    timestamp: true
})

module.exports = Brand;