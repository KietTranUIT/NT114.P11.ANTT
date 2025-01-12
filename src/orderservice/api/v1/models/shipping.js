const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Order = require('./orders');

var ShippingMethod = sequelize.define('shipping_methods', {
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
        type: DataTypes.TEXT,
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    underscored: true,
    timestamp: true,
})

// ShippingMethod.hasMany(Order);

// Order.belongsTo(ShippingMethod, {
//     foreignKey: {
//         name: 'shippingMethod',
//         type: DataTypes.INTEGER
//     }
// })

module.exports = ShippingMethod;