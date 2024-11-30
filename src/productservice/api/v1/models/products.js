const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Brand = require('./brands');
const Category = require('./categories');

var Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
        type: DataTypes.TIME,
    },
    endSale: {
        type: DataTypes.TIME
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    brandId: {
        type: DataTypes.INTEGER,
    },
    categoryId: {
        type: DataTypes.INTEGER,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    reviewAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true,
    timestamp: true
})

Brand.hasMany(Product, {
    foreignKey: 'brandId'
});
Product.belongsTo(Brand);

Category.hasMany(Product, {
    foreignKey: 'categoryId',
});
Product.belongsTo(Category);

module.exports = Product;