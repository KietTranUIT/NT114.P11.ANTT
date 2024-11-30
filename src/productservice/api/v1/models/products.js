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
    price: {
        type: DataTypes.FLOAT,
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
    mainImage: {
        type: DataTypes.STRING,
        defaultValue: 'images/'
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