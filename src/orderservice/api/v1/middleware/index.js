const Cart = require('../models/carts');
const ErrorObj = require('../models/errors');
const errorCodes = require('../../../config/errors');

module.exports.checkPermission = (resource) => {
    return async (req, res, next) => {
        const user = JSON.parse(req.headers['x-user'])
        const cartId = req.params.cartId

        let record = undefined
        switch (resource) {
            case 'cart':
                record = await Cart.findOne({ where: {
                    id: cartId, userId: user.id, status: 'active',
                }})
                break
            default:
                next()
        }

        if (!record) {
            const err = new ErrorObj(errorCodes.permissionDeny, 401, 'Permission denied', 'người dùng không có quyền trên tài nguyên này', {})
            return res.status(401).json({ errors: [err] })
        }
        next()
    }
}
