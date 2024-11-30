const express = require('express');
const router = express.Router();

const userRoutes = require('./products');
const brandRoutes = require('./brands');
const categoryRoutes = require('./categories');

router.use('/products', userRoutes);
router.use('/brands', brandRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;

