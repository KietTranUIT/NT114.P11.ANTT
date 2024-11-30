const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');

// Define table tags
var Tag = sequelize.define('tags', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    underscored: true,
    timestamp: true
})

module.exports = Tag;