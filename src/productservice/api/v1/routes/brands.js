const express = require('express');
const router = express.Router();

const brands = require('./../controllers/brands');
const fileMiddleware = require('../middleware/fileUploads');

router.get('/', brands.getAll)
router.post('/brands', fileMiddleware.uploadSingleFile('image'), brands.create)
router.put('/:id', brands.update)

module.exports = router;

