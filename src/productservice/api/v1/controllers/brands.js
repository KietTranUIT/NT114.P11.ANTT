const Brand = require('../models/brands');

// Get brands pagination
module.exports.getBrands = async (req, res) => {
    try {
        const { page = 0, limit = 10 } = req.query

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
            const {id, ...attributes } = brands[i]
            let brand = {
                type: 'brand',
                id,
                attributes,
            }
            data.push(brand)
        }

        res.status(200).json({
            data: data
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                title: 'Internal Server Error',
                source: 'product-service/server',
                detail: error.message
            }
        })
    }
}