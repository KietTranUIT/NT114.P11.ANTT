const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const Category = require('../models/categories');

// Get all record in categories table
module.exports.getAll = async (req, res) => {
    try {
        let categories = await Category.findAll()
        res.status(200).json({
            data: categories
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}