const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');
const Product = require('./product');
const Tag = require('./tags');

// Define table product_tags
var ProductTag = sequelize.define('product_tags', {
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
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tag,
            key: 'id'
        }
    }
}, {
    underscored: true,
    timestamp: true
})

Product.belongsToMany(Tag, { through: ProductTag} )
Tag.belongsToMany(Product, { through: ProductTag} )

module.exports = ProductTag;