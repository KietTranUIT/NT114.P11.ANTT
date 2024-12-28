const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Product = require('./products');

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
    mType: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    variantId: {
        type: DataTypes.INTEGER,
    },
    isMain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    underscored: true,
    timestamp: true
})

Product.hasMany(ProductMedia, {
    foreignKey: 'productId',
});
ProductMedia.belongsTo(Product, {as: 'product'});


module.exports = ProductMedia;