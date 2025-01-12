const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware');

const order = require('../controllers/orders');

router.get('/', order.get)
router.post('/', order.payment)
router.get('/success', order.success)
router.get('/cancel', order.cancel)
router.get('/:id', order.getDetail)

module.exports = router;
