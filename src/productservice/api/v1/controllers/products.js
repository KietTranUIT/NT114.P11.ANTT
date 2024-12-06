const errorCodes = require('./../../../config/errors');
const ErrorObj = require('../models/errors');
const { checkRequiredParameters, strongParameters, generateSlug } = require('../help');
const Product = require('../models/products');
const ProductMedia = require('../models/media');
const { sequelize } = require('../../../config/db');
const { checkFileType, uploadVideoBuffer, uploadFileV101, resizeImage, isImageFile, isVideoFile } = require('../help/upload');
const ProductVariant = require('../models/variants');
const VariantAttribute = require('../models/variant_attributes');

module.exports.defaultRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to Product service!"})
}

// Limit size video
const limitVideoSize = 45003139 // 20MB

// List params is allowed when create a product
const whiteListProductCreationParams = [
    'name', 'slug', 'description', 'regularPrice', 'salePrice', 'startSale', 'endSale', 'stock', 'status',
    'categoryId', 'brandId', 'reviewAllowed'
]

// List params is allowed when create a product variant
const whiteListVariantCreationParams = [
    'regularPrice', 'salePrice', 'startSale', 'endSale', 'stock', 'status', 'attributes'
]

// List params is allowed when create variant attribute
const whiteListAttributeVariantCreationParams = [
    'attributeId', 'value'
]

// Create a product
module.exports.create = async (req, res) => {
    try {
        // Get product params in form data
        let productData
        try {
            productData = JSON.parse(req.body.product)
        } catch (err_json) {
            const errobj = new ErrorObj(errorCodes.invalidData, 400, "Invalid data", "product form data invalid.", { pointer: "/product" })
            return res.status(400).json({ errors : [errobj]})
        }
        // Checking of params is required
        if ( !checkRequiredParameters(productData, ['name', 'regularPrice'])[0]) {
            return res.status(422).json({ errors: data[1]})
        }
        // Ignore all params is not in whitelist
        const productParams = strongParameters(productData, whiteListProductCreationParams)
        // Check if don't have slug
        if (!productParams.slug) {
            productParams.slug = generateSlug(productParams.name)
        }

        // Get product variant params  
        let variantParams = []
        let variant_errs = []
        if (req.body.variant) {
            // Get variant params in form data
            let variantData
            try {
                variantData = JSON.parse(req.body.variant)
            } catch (err_json) {
                const errobj = new ErrorObj(errorCodes.invalidData, 400, "Invalid data", "variant form data invalid.", { pointer: "/variant" })
                return res.status(400).json({ errors : [errobj]})
            }
            if (!(variantData instanceof Array)) {
                const errobj = new ErrorObj(errorCodes.invalidData, 400, "Invalid data", "variant form data invalid.", { pointer: "/variant" })
                return res.status(400).json({ errors: [errobj] })
            }
            variantData.map((variant) => {
                // Checking of params is required in variant data
                const check = checkRequiredParameters(variant, ['attributes'])
                if (!check[0]) {
                    variant_errs.push(check[1])
                    return
                }

                // Ignore all params is not in whitelist
                let strongVariantParams = strongParameters(variant, whiteListVariantCreationParams)
                // Set variant regular price is product price if it is not exists
                if (!strongVariantParams.regularPrice) {
                    strongVariantParams.regularPrice = productParams.regularPrice
                }

                // Checking of params is required in attribute variant
                strongVariantParams.attributes.map((attribute) => {
                    const check = checkRequiredParameters(attribute, ['attributeId', 'value'])
                    if (!check[0]) {
                        variant_errs.push(check[1])
                        return
                    }
                })
                variantParams.push(strongVariantParams)
                
            })
        }
        if (variant_errs.length > 0) {
            return res.status(422).json({ errors: variant_errs })
        }

        // Check file type of product media
        let flag = true
        let file_errs = []
        req.files.map((file) => {
            if (!checkFileType(file, ['image', 'video'])) {
                const file_err = new ErrorObj(errorCodes.invalidFile, 422, 'Invalid file type', `file ${file.originalname} is invalid`, { pointer: '/file'})
                file_errs.push(file_err)
            }

            // Check limit video file
            if (isVideoFile(file) && file.size > limitVideoSize) {
                const file_err = new ErrorObj(errorCodes.invalidFile, 422, 'Invalid file type', `file ${file.originalname} size over 20MB`, { pointer: '/file'})
                file_errs.push(file_err)
            }
            if (isImageFile(file)) {
                flag = false
            }
        })
        if (flag) {
            const file_err = new ErrorObj(errorCodes.missingField, 422, 'Missing file', 'phải có ít nhất một file hình ảnh', { pointer: '/file'})
            return res.status(422).json({ errors: [file_err]})
        }

        if (file_errs.length > 0) {
            return res.status(422).json({ errors: file_errs })
        }

        let mediaParams = []
        for (let i = 0; i < req.files.length; i++) {
            let uploadResult
            if (isVideoFile(req.files[i])) {
                uploadResult = await uploadVideoBuffer(req.files[i].buffer, 'products')
                if (uploadResult instanceof Error) {
                    throw new Error(uploadResult.message)
                }
                mediaParams.push({ url: uploadResult.secure_url, mType: 'video' })
                return
            }
            uploadResult = await uploadFileV101(req.files[i].buffer, 'products')
            if (i == 0) {
                mediaParams.push({url: uploadResult.secure_url, mType: 'image', isMain: true})
            } else {
                mediaParams.push({url: uploadResult.secure_url, mType: 'image'})
            }
        }


        let product, medias
        let variants = []
        // Create a transaction
        let transaction = await sequelize.transaction()
        try {
            // Create record on products table
            product = await Product.create(productParams, { transaction })

            // Create record on product_medias table
            for(let i = 0; i < mediaParams.length; i++) {
                mediaParams[i].productId = product.id
            }
            medias = await ProductMedia.bulkCreate(mediaParams, { transaction })
 
            // Create record on product_variants table
            if (variantParams.length > 0) {
                for(let i = 0; i < variantParams.length; i++) {
                    let attributeParams = variantParams[i].attributes
                    delete variantParams[i].attributes
                    variantParams[i].productId = product.id
                    let variant = await ProductVariant.create(variantParams[i], { transaction })

                    let attributes = []
                    for (let j = 0; j < attributeParams.length; j++) {
                        const variant_attribute = await VariantAttribute.create({
                            variantId: variant.id,
                            attributeId: attributeParams[i].attributeId,
                            value: attributeParams[i].value
                        }, { transaction })
                        attributes.push(variant_attribute)
                    }
                    variants.push({ variant, attributes })
                }                
            }

            // Save all if success
            await transaction.commit()
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

        res.status(201).json({
            type: 'product',
            data: {
                product, variants, medias 
            }
        })
    } catch (error) {
        res.status(500).json(ErrorObj.createInternalError(error.message))
    }
}
