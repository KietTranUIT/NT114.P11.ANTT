const express = require('express');
const router = express.Router();

const { defaultRoute } = require('./../controllers/products');

router.get('/', defaultRoute)

module.exports = router;

