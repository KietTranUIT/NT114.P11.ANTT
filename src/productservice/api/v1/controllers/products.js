const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const { checkRequiredParameters, strongParameters } = require('../help');
const slugify = require('slugify');
const Product = require('../models/products');
const { sequelize } = require('../../../config/db');
const { checkFileType, uploadFile, uploadFileV101, resizeImage } = require('../help/upload');
const { Transaction } = require('sequelize');

module.exports.defaultRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to Product service!"})
}

// Create a product
module.exports.create = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.product)
        // Checking of params is required
        const data = checkRequiredParameters(productData, ['name', 'slug', 'price'])
        if (!data[0]) {
            return res.status(422).json({ errors: data[1]})
        }

        const { name, slug, price, categoryId=null, brandId=null, description='' } = productData
        
        // Check if uploaded files type is image
        let errs = []
        // req.files.map((file) => {
        //     if (!checkFileType(file, ['image'])) {
        //         const error = new ErrorObj(
        //             errorCodes.invalidFile,
        //             415,
        //             "Invalid file type",
        //             "type of uploaded file is not accepted.",
        //             { pointer: '/file'}
        //         )
        //         errs.push(error)
        //     }
        // })
        if (errs.length > 0) {
            return res.status(422).json({ errors: errs})
        }
        
        // Create a transaction
        let transaction = await sequelize.transaction()

        // Save product to database
        let product, medias
        let urls = []
        try {
            product = await Product.create({
                name, slug, price, categoryId, brandId, description
            }, { transaction })
            await transaction.commit()

            // Upload files
            req.files.map(async (file) => {
                // resize image
                const buffer = await resizeImage(file.buffer, {width: 1000, lenght: 1000})
                // upload to cloudinary
                const uploadResult = await uploadFileV101(buffer, 'products')
                if (uploadResult instanceof Error) {
                    throw new Error(uploadResult.message)
                }
                urls.push(uploadResult)
            })

            // Save url file to database
            let productMedias = []
            urls.map((url) => {
                const media = {
                    url, mType: 'image', productId: product.id
                }
                productMedias.push(media)
            })
            medias = await Product.bulkCreate(productMedias)

        } catch (err_db) {
            await transaction.rollback()
            if (err_db.name === 'SequelizeUniqueConstraintError') {
                let err
                if (err_db.errors[0].path === 'slug') {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate record', 'duplicate slug product.', { pointer: '/product/slug' })
                } else {
                    err = new ErrorObj(errorCodes.duplicateEntry, 422, 'Duplicate entry', 'duplicate name product.', { pointer: '/product/name' })
                }
                return res.status(422).json({ errors: [err] })
            }
            throw err_db
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

        res.status(201).json({
            type: 'product',
            data: product
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}
