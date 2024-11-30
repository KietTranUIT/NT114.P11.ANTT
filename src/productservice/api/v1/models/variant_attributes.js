const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const ProductAttribute = require('./attributes');
const ProductAttribute = require('./attributes');
const ProductVariant = require('./variants');

// Define table variant_attributes
var VariantAttribute = sequelize.define('variant_attributes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    variantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductVariant,
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
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamp: true
})

ProductVariant.belongsToMany(ProductAttribute, { through: VariantAttribute} )
ProductAttribute.belongsToMany(ProductVariant, { through: VariantAttribute} )

module.exports = VariantAttribute;