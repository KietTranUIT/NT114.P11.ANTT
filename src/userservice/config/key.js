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
    },
    jwtSecretKey: {
        accessSecretKey: `${process.env.ACCESS_SECRET_KEY}`,
        refreshSecretKey: `${process.env.REFRESH_SECRET_KEY}`,
    },
    services: {
        jobService: `${process.env.JOB_SERVICE_PORT}`
    },
    google: {
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        scopes: [
            "https%3A//www.googleapis.com/auth/userinfo.email",
            "https%3A//www.googleapis.com/auth/userinfo.profile",
        ],
        callBackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
        oauthURL: `${process.env.GOOGLE_OAUTH_URL}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
    }
}