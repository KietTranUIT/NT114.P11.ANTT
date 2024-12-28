const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const Coupon = require('./coupons');
const Category = require('./categories');

var ApplyCoupon = sequelize.define('apply_coupons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    couponId: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    underscored: true,
    timestamps: false
})

Coupon.hasMany(ApplyCoupon, { foreignKey: 'couponId'})
ApplyCoupon.belongsTo(Category, { foreignKey: 'categoryId'})

Category.hasMany(ApplyCoupon, { foreignKey: 'categoryId'})
ApplyCoupon.belongsTo(Coupon, { foreignKey: 'couponId'})

module.exports = ApplyCoupon;