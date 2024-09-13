const jwt = require('jsonwebtoken');
const keys = require('./../../../config/key');

const secretKey = keys.jwtSecretKey

// Generate a jwt token
module.exports.generateJWT = (payload, expiresIn) => {
    const options = {
        expiresIn
    }

    const token = jwt.sign(payload, secretKey, options)
    return token
}