const express = require('express');
const router = express.Router();

const { defaultRoute, register, login } = require('./../controllers/users');
const { authenticate } = require('./../middlewares');

router.get('/', authenticate, defaultRoute)
router.post('/register', register)
router.post('/login', login)

module.exports = router;

