const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const Category = require('../models/categories');
const { checkRequiredParameters } = require('../help');
const slugify = require('slugify');

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

// Create a category
module.exports.create = async (req, res) => {
    try {
        // Validate request body
        const data = checkRequiredParameters(req.body, ['name'])
        if (!data[0]) {
            return res.status(422).json({ errors: data[1]})
        }

        let { name, description = '', slug, parentId = null } = req.body
        if (!slug) {
            slug = slugify(name, {
                lower: true, strict: true, locale: 'en'
            })
        }

        let category
        try {
            // Execute sql
            category = await Category.create({
                name, description, slug, parentId
            }, { returning: true })
        } catch (err_db) {
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                if (err_db.errors[0].path === 'slug') {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate slug category.', { pointer: '/slug' })
                } else {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate entry', 'duplicate name category.', { pointer: '/name' })
                }
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
        }
        res.status(201).json({
            data: category
        })

    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}