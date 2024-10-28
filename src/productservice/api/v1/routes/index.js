const express = require('express');
const router = express.Router();

const userRoutes = require('./products');
const brandRoutes = require('./brands');

router.use('/', userRoutes);
router.use('/brand', brandRoutes);

module.exports = router;

