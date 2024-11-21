const express = require('express');
const router = express.Router();

const categories = require('./../controllers/categories');

router.get('/', categories.getAll)
router.post('/', categories.create)
router.put('/:id', categories.update)

module.exports = router;

