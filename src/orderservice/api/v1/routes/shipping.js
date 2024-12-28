const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware');

const shipping = require('../controllers/shipping');

router.get('/', shipping.get)

module.exports = router;