const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

var Category = sequelize.define('categories', {
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
}, {
    underscored: true,
    timestamp: true
})

// Category.hasOne(Category, {
//     foreignKey: 'parentId'
// });
Category.belongsTo(Category, {
    foreignKey: 'parentId'
});

module.exports = Category;