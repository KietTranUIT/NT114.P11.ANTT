const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Product = require('./products');
const ProductVariant = require('./variants');
const Order = require('./orders');


var OrderItem = sequelize.define('order_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    variantId: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    typeDiscount: {
        type: DataTypes.ENUM(['percent', 'fixed']),
        defaultValue: 'percent'
    }
}, {
    underscored: true,
    timestamp: true
})

Order.hasMany(OrderItem, { foreignKey: 'orderId' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId'})

Product.hasMany(OrderItem, { foreignKey: 'productId' })
OrderItem.belongsTo(Product, { foreignKey: 'productId'})

ProductVariant.hasMany(OrderItem, { foreignKey: 'variantId' })
OrderItem.belongsTo(ProductVariant, { foreignKey: "variantId"})


module.exports = OrderItem;