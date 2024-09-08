const express = require('express');
const router = express.Router();

const userRoutes = require('./users');

router.use('/', userRoutes);

module.exports = router;

