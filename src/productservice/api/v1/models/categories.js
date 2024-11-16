const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const ProductAttribute = require('./attributes');

var Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
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
    parentId: {
        type: DataTypes.INTEGER
    }
}, {
    underscored: true,
    timestamp: true
})

Category.hasMany(Category, {
    foreignKey: 'parentId'
});
Category.belongsTo(Category);

module.exports = ProductAttribute;