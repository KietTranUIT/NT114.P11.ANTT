const express = require('express');
const router = express.Router();

const { defaultRoute, register, login } = require('./../controllers/users');

router.get('/', defaultRoute)
router.post('/register', register)
router.post('/login', login)

module.exports = router;

