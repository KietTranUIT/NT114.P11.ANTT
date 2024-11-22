const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const ProductAttribute = require('./attributes');
const Product = require('./product');

var ProductMedia = sequelize.define('product_medias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    m_type: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    variantId: {
        type: DataTypes.INTEGER,
    }
}, {
    underscored: true,
    timestamp: true
})

Product.hasMany(ProductMedia, {
    foreignKey: 'productId',
});
ProductMedia.belongsTo(Product);

ProductVariant.hasMany(ProductMedia, {
    foreignKey: 'variantId',
});
ProductMedia.belongsTo(ProductVariant)


module.exports = ProductMedia;