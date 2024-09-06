const express = require('express');
const router = express.Router();

const { defaultRoute } = require('./../controllers/users');

router.get('/', defaultRoute)

module.exports = router;

