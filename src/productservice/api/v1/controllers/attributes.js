const { checkRequiredParameters, strongParameters } = require('../help');
const ProductAttribute = require('./../models/attributes');
const ErrorObj = require('../models/errors');
const errorCodes = require('./../../../config/errors');

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

// Create a product attribute
module.exports.create = async (req, res) => {
    try {
        // name of attribute is required
        const isValid = checkRequiredParameters(req.body, ['name'])
        if (!isValid[0]) {
            return res.status(422).json({ errors: isValid[1]})
        }

        // Get params from request body
        const { name, description } = req.body

        // Create a attribute record on database
        let attribute
        try {
            attribute = await ProductAttribute.create({
                name, description
            })
        } catch (err_db) {
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                const err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate name product attribute', { pointer: '/name'})
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
        }
        res.status(201).json({
            type: 'attribute',
            data: attribute
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Update a product attribute
module.exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const params = strongParameters(req.body, ['name', 'description'])
        let attribute
        try {
            attribute = await ProductAttribute.update(params,{
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

        let data = attribute[0] != 0 ? attribute[1] : {}
        res.status(200).json({
            type: 'attribute',
            data: data
        })
    } catch(error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete a product attribute
module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        let result
        try {
            result = await ProductAttribute.destroy({ where: { id } })
        } catch(err_db) {
            if (err_db.name === "SequelizeForeignKeyConstraintError") {
                const err = new ErrorObj(errorCodes.foreignKeyConstraint, 422, "Violate constraint", "violate foreign key constraint product variant", { pointer: "/variant_attributes/attribute_id"})
                return res.status(422).json({ errors: [err] })
            }
        }
        res.status(200).json({ message: 'delete successfully.'})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}