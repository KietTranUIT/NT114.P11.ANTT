require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.PORT1 || 9000,
    jwtSecretKey: {
        accessSecretKey: `${process.env.ACCESS_SECRET_KEY}`,
        refreshSecretKey: `${process.env.REFRESH_SECRET_KEY}`,
    },
    google: {
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        scopes: [
            "https%3A//www.googleapis.com/auth/userinfo.email",
            "https%3A//www.googleapis.com/auth/userinfo.profile",
        ],
        callBackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
        oauthURL: `${process.env.GOOGLE_OAUTH_URL}`,

    }
}