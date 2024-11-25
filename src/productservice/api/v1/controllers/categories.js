const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const Category = require('../models/categories');
const { checkRequiredParameters, strongParameters } = require('../help');
const slugify = require('slugify');
const sequelize = require('sequelize');
const Product = require('../models/products');

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

// Get detail a category
module.exports.getCategory = async (req, res) => {
    try {
        let categoryId = req.params.id
        
        let category = await Category.findOne({
            where: { id: categoryId },
            include: [{
                model: Product,
                attributes: []
            }, {
                model: Category,
            }],
            attributes: ['id', 'name', 'description', 'slug', 'parentId', 'icon', 'createdAt', 'updatedAt', [sequelize.fn('COUNT', sequelize.col('products.id')), 'productCount']],
            group: ['categories.id', 'category.id']
        })
        res.status(200).json({
            type: 'category',
            data: category
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete multiple category with id
module.exports.deleteMultiple = async (req, res) => {
    try {
        const { selected } = req.body
        if (selected.length <= 0) {
            const err = new ErrorObj(errorCodes.invalidData, 422, 'Invalid data', 'category id empty.', { pointer: "/selected"})
            res.status(422).json({ errors: [err] })
        }

        try {
            const result = await Category.destroy({
                where: {
                    id: {
                        [sequelize.Op.in]: selected
                    }
                }
            })
            res.status(200).json({message: 'delete successfully.'})
        } catch (err_db) {
            const err = new ErrorObj(errorCodes.foreignKeyConstraint, 422, 'Violate constraint', err_db.message, { pointer: "/selected" })
            res.status(422).json({errors: [err]})
        }
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Search category
module.exports.search = async (req, res) => {
    try {
        const { name } = req.query
        const categories = await Category.findAll({
            where: {
                name: {
                    [sequelize.Op.iLike]: `%${name}%`
                }
            }
        })
        res.status(200).json({
            len: categories.length,
            data: categories,
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

        if (parentId != null) {
            if (!Number.isInteger(parentId) || parentId < 0) {
                const err = new ErrorObj(errorCodes.invalidData, 422, "Invalid data", "parentId must be number and greater 0.")
                return res.status(422).json({ errors: [err] })
            }
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
                where: { id: categoryId },
                returning: true,
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
        res.status(200).json({data: category[1]})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete a category
module.exports.delete = async (req, res) => {
    try {
        let categoryId = req.params.id
        try {
            await Category.destroy({ where: { id: categoryId }})
        } catch(err_db) {
            if (err_db.name === "SequelizeForeignKeyConstraintError") {
                const err = new ErrorObj(errorCodes.foreignKeyConstraint, 422, "Violate constraint", "violate foreign key constraint parentId.", { pointer: "/parentId"})
                return res.status(422).json({ errors: [err] })
            }
        }
        res.status(200).json({message: "category is deleted"})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}