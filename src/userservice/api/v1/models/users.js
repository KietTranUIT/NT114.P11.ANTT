const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../config/db');
const { ACCOUNT_STATUS } = require('../constants');
const Role = require('./roles');

var User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dayOfBirth: {
        type: DataTypes.DATE,
    },
    password: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM([ACCOUNT_STATUS.Active, ACCOUNT_STATUS.Inactive, ACCOUNT_STATUS.Blocked]),
        defaultValue: 'active'
    },
}, {
    underscored: true,
    timestamp: true
})

Role.hasMany(User);

User.belongsTo(Role, {
    foreignKey: {
        name: 'roleId',
        type: DataTypes.INTEGER
    }
})

module.exports = User;