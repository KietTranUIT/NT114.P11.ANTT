require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.PORT1 || 9000,
    jwtSecretKey: {
        accessSecretKey: `${process.env.ACCESS_SECRET_KEY}`,
        refreshSecretKey: `${process.env.REFRESH_SECRET_KEY}`,
    }
}