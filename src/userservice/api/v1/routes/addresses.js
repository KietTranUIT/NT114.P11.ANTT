const express = require('express');
const router = express.Router();

const userAddress = require('../controllers/addresses');

router.post('/', userAddress.create)
router.get('/', userAddress.get)
router.put('/:addressId', userAddress.update)
router.delete('/:addressId', userAddress.delete)

module.exports = router;

