const express = require('express');
const router = express.Router();

const userRoutes = require('./products');

router.use('/', userRoutes);

module.exports = router;

