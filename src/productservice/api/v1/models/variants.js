const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Product = require('./products');
const ProductMedia = require('./media');

// Define table product_variants
var ProductVariant = sequelize.define('product_variants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.STRING
    },
    regularPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    salePrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    startSale: {
        type: DataTypes.TIME
    },
    endSale: {
        type: DataTypes.TIME
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
}, {
    underscored: true,
    timestamp: true
})

Product.hasMany(ProductVariant, {
    foreignKey: 'productId'
})
ProductVariant.belongsTo(Product)

ProductVariant.hasMany(ProductMedia, {
    foreignKey: 'variantId',
});
ProductMedia.belongsTo(ProductVariant, { as: 'variant'})

module.exports = ProductVariant;