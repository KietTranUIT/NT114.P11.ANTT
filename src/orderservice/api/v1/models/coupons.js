const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Coupon = sequelize.define('coupons', {
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
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    valueType: {
        type: DataTypes.ENUM(['fixed', 'percent']),
        defaultValue: 'fixed',
    },
    minOrder: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    maxDiscount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    startDate: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endDate: {
        type: DataTypes.TIME,
        allowNull: false
    },
    apply: {
        type: DataTypes.ENUM(['order', 'ship', 'category']),
        defaultValue: 'order'
    },
    usageLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    usageCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = Coupon;