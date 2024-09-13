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

// Verify a jwt token
module.exports.verifyJWT = token => {
    const user = jwt.verify(token, secretKey)
    console.log(user)
    return user
}