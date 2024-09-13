const codeErrors = require('./../constants/errors');
const { verifyJWT } = require('./../helpers/password');

module.exports.authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization']
        
        if (!authorization) {
            throw new Error('Authorization header not found.')
        }

        const auth = authorization.split(' ')
        if (auth[0] != 'Bearer') {
            throw new Error('Bearer in authorization header not found.')
        }

        const user = verifyJWT(auth[1], 'access_token')
        req.user = user
        next()   
    } catch (error) {
        return res.status(401).json({
            errors: [{
                code: codeErrors.authenticateError.code,
                title: codeErrors.authenticateError.title,
                source: 'header',
                detail: error.message
            }]
        })
    }
}