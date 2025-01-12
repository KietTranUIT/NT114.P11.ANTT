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
    logo: {
        type: DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/dfgnimhoi/image/upload/v1731375828/brands/an2tejdhnpkw8f0qbao0.jpg'
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