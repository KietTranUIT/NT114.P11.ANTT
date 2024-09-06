require('dotenv').config({ path: './../../.env'})

module.exports = {
    port: process.env.PORT1 || 9000
}