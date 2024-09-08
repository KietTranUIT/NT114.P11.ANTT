const User = require('../models/users');
const Role = require('../models/roles');

module.exports.defaultRoute = async (req, res) => {
    const users = await User.findAll({include: Role});
    res.status(200).json(users)
}