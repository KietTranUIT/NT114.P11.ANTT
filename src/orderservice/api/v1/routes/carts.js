const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware');

const carts = require('../controllers/carts');

router.post('/', carts.create)
router.get('/', carts.get)
router.post('/:cartId', checkPermission('cart'), carts.addItem)
// router.delete('/:cartId', checkPermission('cart'), carts.removeItem)
router.put('/:cartId', checkPermission('cart'), carts.updateItem)
router.delete('/:cartId', checkPermission('cart'), carts.deleteItem)

module.exports = router;