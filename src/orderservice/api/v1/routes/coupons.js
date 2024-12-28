const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware');

const coupons = require('../controllers/coupons');

router.get('/', coupons.get)

module.exports = router;