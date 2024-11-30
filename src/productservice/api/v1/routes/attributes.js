const express = require('express');
const router = express.Router();

const attribute = require('./../controllers/attributes');

router.get('/:id', attribute.get)
router.post('/', attribute.create)
router.put('/:id', attribute.update)
router.delete('/:id', attribute.delete)
router.get('/', attribute.getAll)

module.exports = router;
