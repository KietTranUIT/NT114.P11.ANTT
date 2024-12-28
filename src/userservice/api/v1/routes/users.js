const express = require('express');
const router = express.Router();

const { defaultRoute, register, login, refresh, redirectGoogle } = require('./../controllers/users');
const { authenticate } = require('./../middlewares');
const addressRoutes = require('./addresses');

router.get('/', defaultRoute)
router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.get('/login/google', redirectGoogle)

router.use('/addresses', addressRoutes)

module.exports = router;

