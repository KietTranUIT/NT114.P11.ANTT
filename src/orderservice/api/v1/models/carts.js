const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Cart = sequelize.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['active', 'completed', 'pending']),
        defaultValue: 'active'
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = Cart;