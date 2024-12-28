require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.JOB_SERVICE_PORT || 9009,
    redisURL: process.env.REDIS_URL,
    mail: {
        sender: `${process.env.SENDER}`,
        sender_password: `${process.env.SENDER_PASSWORD}`,
    },
}