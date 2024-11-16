const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var ProductAttribute = sequelize.define('product_attributes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = ProductAttribute;