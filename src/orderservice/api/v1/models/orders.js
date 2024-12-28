const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Cart = require('./carts');

var Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['pending', 'confirmed', 'completed', 'cancelled', 'returned']),
        defaultValue: 'pending',
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    underscored: true,
    timestamp: true
})

Cart.hasOne(Order, {
    foreignKey: 'cartId',
});

Order.belongsTo(Cart)

module.exports = Order;