const express = require('express');
const router = express.Router();

const tag = require('./../controllers/tags');

// router.get('/:id', attribute.get)
router.post('/', tag.create)
router.put('/:id', tag.update)
router.delete('/:id', tag.delete)
// router.get('/', attribute.getAll)

module.exports = router;
