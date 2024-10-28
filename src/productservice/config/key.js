require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.PRODUCT_SERVICE_PORT || 9005,
    database: {
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        dbname: `${process.env.DB_NAME}`,
        host: `${process.env.DB_HOST}`
    },
    cloud: {
        cloud_name: `${process.env.CLOUD_NAME}`,
        api_key: `${process.env.CLOUD_API_KEY}`,
        api_secret: `${process.env.CLOUD_API_SECRET}`
    }
}