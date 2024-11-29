const Brand = require('../models/brands');
const ErrorObj = require('../models/errors');
const { checkFileType, uploadFile, resizeImage } = require('../help/upload');
const errorCodes = require('./../../../config/errors');
const slugify = require('slugify');
const help = require('./../help');
const sequelize = require('sequelize');
const Product = require('./../models/products');

// Search brands
module.exports.search = async (req, res) => {
    try {
        const { name } = req.query
        const brands = await Brand.findAll({
            where: {
                name: {
                    [sequelize.Op.iLike]: `%${name}%`
                }
            }
        })
        res.status(200).json({
            len: brands.length,
            data: brands,
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Get total brands
module.exports.count = async (req, res) => {
    try {
        const total = await Brand.count()
        return res.status(200).json( { type: "brand", total })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Get brands pagination
module.exports.getAll = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        if (page === NaN || page <= 0) page = 1
        if (limit === NaN || limit < 0) limit = 0

        // Get brands
        const brands = await Brand.findAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [
                ['id', 'ASC']
            ],
        })

        res.status(200).json({
            type: 'brand',
            len: brands.length,
            data: brands
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Create a brand of products
module.exports.create = async (req, res) => {
    try {
        const brandData = JSON.parse(req.body.brand)
        // Name of brand is required
        if (!brandData.name) {
            const error = new ErrorObj(
                errorCodes.missingField,
                422,
                "Missing attributes",
                "missing name attribute.",
                { pointer: '/brand/name' }
            )
            return res.status(422).json({
                errors: [error]
            })
        }
        
        // Check if file type is image
        if (!checkFileType(req.file, ['image'])) {
            const error = new ErrorObj(
                errorCodes.invalidFile,
                415,
                "Invalid file type",
                "type of uploaded file is not accepted.",
                { pointer: 'file'}
            )
            return res.status(415).json({
                errors: [error]
            })
        }
        
        // Check if name of brand is existed
        let brand = await Brand.findOne({
            where: { name: brandData.name }
        })
        if (brand) {
            const error = new ErrorObj(
                errorCodes.duplicateEntry,
                422,
                "Duplicate entry",
                "name of brand is existed.",
                { pointer: '/brand/name' }
            )
            return res.status(422).json({ errors: [error]})
        }

        // resize image
        const buffer = await resizeImage(req.file.buffer, {width: 300, length: 300})

        // Upload image to cloudinary
        const uploadResult = await uploadFile(buffer)
        if (uploadResult instanceof Error) {
            throw new Error(uploadResult.message)
        }

        // Create slug
        if (brandData.slug == '') {
            const error = new ErrorObj(
                errorCodes.invalidData,
                422,
                "Invalid data",
                "slug of brand empty.",
                { pointer: '/brand/slug' }
            )
            return res.status(422).json({ errors: [error]})
        }
        // const slug = slugify(brandData.name, {
        //     lower: true, strict: true, locale: 'en'
        // })

        // Save brand to database
        brand = await Brand.create({
            name: brandData.name,
            description: brandData.description,
            slug: brandData.slug,
            logo: uploadResult.secure_url
        })
        res.status(201).json({
            type: 'brand',
            data: brand
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Update a brand
module.exports.update = async (req, res) => {
    try {
        const idBrand = req.params.id
        // Validate brand id
        if (isNaN(idBrand)) {
            const err = new ErrorObj(errorCodes.invalidData, 422, 'Invalid data', 'invalid brand id', { parameter: '/id' })
            return res.status(422).json({ errors: err })
        }
        const updateBrand = help.strongParameters(req.body, ['name', 'description', 'slug'])

        // Check if name is duplicated
        let brand
        try {
            // Update brand
            let updateResult = await Brand.update(updateBrand, {
                where: { id: idBrand },
                returning: true,
            })

            // Brand not exists
            if (updateResult[0] === 0) {
                return res.status(204).send()
            }
            brand = updateResult[1]
        } catch (err_db) {
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                if (err_db.errors[0].path === 'slug') {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate brand slug.', { pointer: '/slug' })
                } else {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate entry', 'duplicate brand name.', { pointer: '/name' })
                }   
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
        }
        
        res.status(200).json({
            type: "brand",
            data: brand
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Upload logo for a brand
module.exports.uploadLogo = async (req, res) => {
    try {
        const idBrand = req.params.id
        // Validate brand id
        if (isNaN(idBrand)) {
            const err = new ErrorObj(errorCodes.invalidData, 422, 'Invalid data', 'invalid brand id', { parameter: '/id' })
            return res.status(422).json({ errors: err })
        }

        // Check if file type is image
        if (!checkFileType(req.file, ['image'])) {
            const error = new ErrorObj(
                errorCodes.invalidFile,
                415,
                "Invalid file type",
                "type of uploaded file is not accepted.",
                { pointer: "/file" }
            )
            return res.status(415).json({
                errors: [error]
            })
        }

        // resize image
        const buffer = await resizeImage(req.file.buffer, {width: 300, length: 300})

        // Upload image to cloudinary
        const uploadResult = await uploadFile(buffer)
        if (uploadResult instanceof Error) {
            throw uploadResult
        }

        // Update logo url
        let updateResult = await Brand.update({
            logo: uploadResult.secure_url
        }, {
            where: { id: idBrand },
            returning: true,
        })

        if (updateResult[0] === 0) {
            return res.status(204).send()
        }
        res.status(200).json({
            type: 'brand',
            data: updateResult[1]
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete a brand
module.exports.delete = async (req, res) => {
    try {
        let brandId = req.params.id
        try {
            await Brand.destroy({ where: { id: brandId }})
        } catch(err_db) {
            if (err_db.name === "SequelizeForeignKeyConstraintError") {
                const err = new ErrorObj(errorCodes.foreignKeyConstraint, 422, "Violate constraint", "violate foreign key constraint parentId.", { pointer: "/parentId"})
                return res.status(422).json({ errors: [err] })
            }
        }
        res.status(200).json({message: 'delete successfull'})
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}

// Delete multiple brand
module.exports.deleteMultiple = async (req, res) => {
    try {
        const { selected } = req.body
        if (selected.length <= 0) {
            const err = new ErrorObj(errorCodes.invalidData, 422, 'Invalid data', 'brand id empty.', { pointer: "/selected"})
            res.status(422).json({ errors: [err] })
        }

        try {
            const result = await Brand.destroy({
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

module.exports.getBrand = async (req, res) => {
    try {
        let brandId = req.params.id
        
        let brand = await Brand.findOne({
            where: { id: brandId },
            include: [{
                model: Product,
                attributes: []
            }],
            attributes: ['id', 'name', 'description', 'slug', 'logo', 'createdAt', 'updatedAt', [sequelize.fn('COUNT', sequelize.col('products.id')), 'productCount']],
            group: ['brands.id']
        })
        res.status(200).json({
            type: 'brand',
            data: brand
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}