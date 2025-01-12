const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

// Define table product_attributes
var ProductAttribute = sequelize.define('product_attributes', {
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
        type: DataTypes.STRING,
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = ProductAttribute;