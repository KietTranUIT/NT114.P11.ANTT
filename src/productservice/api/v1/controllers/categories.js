const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const Category = require('../models/categories');
const { checkRequiredParameters, strongParameters } = require('../help');
const slugify = require('slugify');
const { where } = require('sequelize');

// Get all record in categories table
module.exports.getAll = async (req, res) => {
    try {
        let categories = await Category.findAll({
            include: {
                model: Category,
            }
        })
        res.status(200).json({
            len: categories.length,
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

// Update a category
module.exports.update = async (req, res) => {
    try {
        const categoryId = req.params.id
        let data = strongParameters(req.body, ['name', 'slug', 'description', 'parentId'])

        if (data.parentId) {
            // Check if parent id is integer
            if (!Number.isInteger(data.parentId) || data.parentId < 0) {
                const err = new ErrorObj(errorCodes.invalidData, 422, "Invalid data", "parentId must be number and greater 0.", { pointer: "/parentId" })
                return res.status(422).json({ errors: [err] })
            }
        }

        let category
        try {
            category = await Category.update(data, {
                where: { id: categoryId }
            })
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
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}