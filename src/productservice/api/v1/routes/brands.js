const express = require('express');
const router = express.Router();

const brands = require('./../controllers/brands');
const fileMiddleware = require('../middleware/fileUploads');

router.get('/search', brands.search)
router.get('/total', brands.count)
router.get('/', brands.getAll)
router.post('/', fileMiddleware.uploadSingleFile('file'), brands.create)
router.get('/:id', brands.getBrand)
router.put('/:id', brands.update)
router.delete('/:id', brands.delete)
router.put('/:id/upload', fileMiddleware.uploadSingleFile('file'), brands.uploadLogo)
router.post('/delete', brands.deleteMultiple)

module.exports = router;

