const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const User = require('./users');

var UserAddress = sequelize.define('user_addresses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    additionalInformation: {
        type: DataTypes.TEXT,
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    underscored: true,
    timestamp: true
})

User.hasMany(UserAddress, { foreignKey: 'userId'} );

UserAddress.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserAddress;