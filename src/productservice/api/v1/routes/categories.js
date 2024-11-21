const express = require('express');
const router = express.Router();

const categories = require('./../controllers/categories');

router.get('/', categories.getAll)
router.post('/', categories.create)
router.put('/:id', categories.update)
router.delete('/:id', categories.delete)

module.exports = router;

