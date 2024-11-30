const express = require('express');
const router = express.Router();

const attribute = require('./../controllers/attributes');

router.post('/', attribute.create)

module.exports = router;
