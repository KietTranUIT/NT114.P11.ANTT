const codeErrors = require('./../constants/errors');
const { verifyJWT } = require('./../helpers/password');
const { services, serviceIdentity } = require('./../config/services');

// This is a middleware to verify token for indentify user
module.exports.authenticate = async (req, res, next) => {
    try {
        const serviceIndex = serviceIdentity[req.baseUrl]
        if (serviceIndex === undefined) {
            res.status(404).json({ message: "Not Found Page"})
            return
        }

        let flag = false
        for (let i = 0; i < services[serviceIndex].paths.length; i++) {
            if (req.path === services[serviceIndex].paths[i].path && services[serviceIndex].paths[i].auth.includes(req.method)) {
                flag = true
                break
            }
        }

        if (!flag) {
            next()
            return
        }
        
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