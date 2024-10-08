const jwt = require('jsonwebtoken');
const keys = require('./../config/key');

const { accessSecretKey, refreshSecretKey } = keys.jwtSecretKey

// Generate a jwt token
module.exports.generateJWT = (payload, expiresIn, type) => {
    const options = {
        expiresIn
    }

    if (type === 'access_token') {
        return jwt.sign(payload, accessSecretKey, options)
    }

    return jwt.sign(payload, refreshSecretKey, options)
}

// Verify a jwt token
module.exports.verifyJWT = (token, type) => {
    if (type === 'access_token') {
        return jwt.verify(token, accessSecretKey)
    }
    return jwt.verify(token, refreshSecretKey)
}