const Brand = require('../models/brands');
const ErrorObj = require('../models/errors');
const { checkFileType, uploadFile, resizeImage } = require('../help/upload');
const errorCodes = require('./../../../config/errors');
const slugify = require('slugify');


// Get brands pagination
module.exports.getAll = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        if (page === NaN || page <= 0) page = 1
        if (limit === NaN || limit < 0) limit = 0

        // get brands
        const brands = await Brand.findAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        })
        let data = []
        for (let i = 0; i < brands.length; i++) {
            let brand = {
                type: 'brand',
                attributes: brands[i]
            }
            data.push(brand)
        }

        res.status(200).json({
            data: data
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
                "missing name attribute."
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
                "type of uploaded file is not accepted."
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
        const buffer = await resizeImage(req.file.buffer, {width: 1000, length: 1000})

        // Upload image to cloudinary
        const uploadResult = await uploadFile(buffer)
        if (uploadResult instanceof Error) {
            throw new Error(uploadResult.message)
        }

        // Create slug
        const slug = slugify(brandData.name, {
            lower: true, strict: true, locale: 'en'
        })

        // Save brand to database
        brand = await Brand.create({
            name: brandData.name,
            description: brandData.description,
            slug: slug,
            logo_url: uploadResult.secure_url
        })
        res.status(201).json({
            data: {
                type: 'brand',
                attributes: brand
            }
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}