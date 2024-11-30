const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
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
    timestamps: false
})

ProductVariant.belongsToMany(ProductAttribute, { through: VariantAttribute, as:"variant", foreignKey: 'variantId'} )
ProductAttribute.belongsToMany(ProductVariant, { through: VariantAttribute, as: "attribute",  foreignKey: 'attributeId'})

module.exports = VariantAttribute;