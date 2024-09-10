require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.USER_SERVICE_PORT || 9002,
    database: {
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        dbname: `${process.env.DB_NAME}`,
        host: `${process.env.DB_HOST}`
    },
    bcrypt: {
        saltRounds: parseInt(process.env.SALT_ROUNDS),
    },
    redisURL: process.env.REDIS_URL,
    mail: {
        sender: `${process.env.SENDER}`,
        sender_password: `${process.env.SENDER_PASSWORD}`,
    }
}