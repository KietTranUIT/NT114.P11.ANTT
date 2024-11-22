const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const ProductAttribute = require('./attributes');
const Product = require('./product');

var ProductVariant = sequelize.define('product_variants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        }
    },
    attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductAttribute,
            key: 'id',
        }
    },
    parentId: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING
    },
    extra: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
}, {
    underscored: true,
    timestamp: true
})

Product.belongsToMany(ProductAttribute, { through: ProductVariant });
ProductAttribute.belongsToMany(Product, { through: Product });

module.exports = ProductVariant;