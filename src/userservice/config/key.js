require('dotenv').config({ path: './../../.env' });

module.exports = {
    port: process.env.USER_SERVICE_PORT || 9001
}