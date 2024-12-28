const express = require('express');
const router = express.Router();
const cartRoutes = require('./carts');
const orderRoutes = require('./orders');
const shippingRoutes = require('./shipping');
const couponRoutes = require('./coupons');

router.use('/carts', cartRoutes)
router.use('/orders', orderRoutes)
router.use('/shipping', shippingRoutes)
router.use('/coupons', couponRoutes)

module.exports = router;