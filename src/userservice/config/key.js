require('dotenv').config({ path: './../../.env' });

module.exports = {
    port: process.env.USER_SERVICE_PORT || 9001,
    database: {
        user: `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
        dbname: `${process.env.POSTGRES_DBNAME}`,
        host: `${process.env.POSTGRES_HOST}`
    }
}