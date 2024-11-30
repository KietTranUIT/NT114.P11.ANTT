const { checkRequiredParameters, strongParameters } = require('../help');
const ProductAttribute = require('./../models/attributes');
const ErrorObj = require('../models/errors');
const errorCodes = require('./../../../config/errors');

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