const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware');

const order = require('../controllers/orders');

router.get('/', order.default)
router.post('/', order.payment)
router.get('/success', order.success)
router.get('/cancel', order.cancel)

module.exports = router;