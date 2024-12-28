const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Order = require('./orders');

var TrackOrder = sequelize.define('track_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
    },
    isFinal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    underscored: true,
    timestamp: true
})

Order.hasMany(TrackOrder, {
    foreignKey: 'orderId',
});

TrackOrder.belongsTo(Order)

module.exports = TrackOrder;