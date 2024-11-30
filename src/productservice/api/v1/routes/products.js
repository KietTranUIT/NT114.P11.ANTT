const express = require('express');
const router = express.Router();

const products = require('./../controllers/products');
const attributeRoutes = require('./attributes');
const fileMiddleware = require('../middleware/fileUploads');


router.use('/attributes', attributeRoutes)
router.get('/', products.defaultRoute)
router.post('/', fileMiddleware.uploadMultipleFile('file', 10), products.create)

module.exports = router;

