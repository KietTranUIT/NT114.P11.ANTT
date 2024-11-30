const express = require('express');
const router = express.Router();

const attribute = require('./../controllers/attributes');

router.post('/', attribute.create)
router.put('/:id', attribute.update)

module.exports = router;
