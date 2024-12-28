const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Product = require('./products');
const ProductVariant = require('./variants');
const Cart = require('./carts');


var CartItem = sequelize.define('cart_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cartId: {
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
    }
}, {
    underscored: true,
    timestamp: true
})

Cart.hasMany(CartItem, { foreignKey: 'cartId'})
CartItem.belongsTo(Product, { foreignKey: 'productId'})
CartItem.belongsTo(ProductVariant, { foreignKey: "variantId"})

Product.hasMany(CartItem, { foreignKey: 'productId'})
ProductVariant.hasMany(CartItem, { foreignKey: 'variantId'})
CartItem.belongsTo(Cart, { foreignKey: 'cartId'})


module.exports = CartItem;