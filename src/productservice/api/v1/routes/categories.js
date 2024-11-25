const express = require('express');
const router = express.Router();

const categories = require('./../controllers/categories');

router.get('/search', categories.search)
router.get('/', categories.getAll)
router.get('/:id', categories.getCategory)
router.post('/', categories.create)
router.put('/:id', categories.update)
router.delete('/:id', categories.delete)
router.post('/delete', categories.deleteMultiple)

module.exports = router;

