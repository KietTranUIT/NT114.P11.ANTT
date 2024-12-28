const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Product = require('./products');
const User = require('./users');

var ProductReview = sequelize.define('product_reviews', {
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
    },
}, {
    underscored: true,
    timestamp: true
})

// Product.belongsToMany(User, { through: ProductReview, as:"comments"})
// User.belongsToMany(Product, { through: ProductReview, as:"comments"})

Product.hasMany(ProductReview)
ProductReview.belongsTo(User)

User.hasMany(ProductReview)
ProductReview.belongsTo(Product)

module.exports = ProductReview;
