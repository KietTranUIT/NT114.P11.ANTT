const express = require('express');
const router = express.Router();

const { defaultRoute, register } = require('./../controllers/users');

router.get('/', defaultRoute)
router.get('/register', register)

module.exports = router;

