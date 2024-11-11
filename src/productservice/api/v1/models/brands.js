const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Brand = sequelize.define('brands', {
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
    logo_url: {
        type: DataTypes.STRING,
        defaultValue: 'logo.jpg'
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = Brand;