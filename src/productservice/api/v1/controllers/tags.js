const { checkRequiredParameters, strongParameters } = require('../help');
const Tag = require('./../models/tags');
const ErrorObj = require('../models/errors');
const errorCodes = require('./../../../config/errors');
const slugify = require('slugify');

// Fetch all product attributes api
module.exports.getAll = async (req, res) => {
    try {
        let attributes = await ProductAttribute.findAll()
        res.status(200).json({
            type: 'attribute',
            len: attributes.length,
            data: attributes
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Get detailed information about product attributes
module.exports.get = async (req, res) => {
    try {
        const { id } = req.params
        let attribute = await ProductAttribute.findOne({where: {id}})
        res.status(200).json({
            type: 'attribute',
            data: attribute
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Create a product tag
module.exports.create = async (req, res) => {
    try {
        // name of attribute is required
        const isValid = checkRequiredParameters(req.body, ['name'])
        if (!isValid[0]) {
            return res.status(422).json({ errors: isValid[1]})
        }

        // Get params from request body
        const { name, description, slug } = req.body

        // Create a tag record on database
        let tag
        try {
            tag = await Tag.create({
                name, description, slug
            })
        } catch (err_db) {
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                if (err_db.errors[0].path === 'slug') {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate slug tag.', { pointer: '/slug' })
                } else {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate entry', 'duplicate name tag.', { pointer: '/name' })
                }
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
        }
        res.status(201).json({
            type: 'tag',
            data: tag
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Update a product tag
module.exports.update = async (req, res) => {
    try {
        const { id } = req.params
        let params = strongParameters(req.body, ['name', 'description'])
        if (params.name) {
            params.slug = slugify(params.name, {
                lower: true, strict: true, locale: 'en'
            })
        }
        let tag
        try {
            tag = await Tag.update(params,{
                where: { id },
                returning: true,
            })
        } catch (err_db) {
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                const err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate name product attribute', { pointer: '/name'})
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
        }

        let data = tag[0] != 0 ? tag[1] : {}
        res.status(200).json({
            type: 'tag',
            data: data
        })
    } catch(error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete a product tag
module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        let result
        try {
            result = await Tag.destroy({ where: { id } })
        } catch(err_db) {
            if (err_db.name === "SequelizeForeignKeyConstraintError") {
                const err = new ErrorObj(errorCodes.foreignKeyConstraint, 422, "Violate constraint", "violate foreign key constraint product", { pointer: "/variant_attributes/attribute_id"})
                return res.status(422).json({ errors: [err] })
            }
        }
        res.status(200).json({ message: 'delete successfully.'})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}