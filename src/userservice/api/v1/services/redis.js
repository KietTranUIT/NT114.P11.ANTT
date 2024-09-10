const { createClient } = require('redis');
const chalk = require('chalk');

const keys = require('../../../config/key');

const client = createClient({
    url: keys.redisURL
})

client.on('error', err => {
    console.log(
        `[${chalk.red('X')}] ${chalk.blue(
            `Connection to redis failed, err = ${err.message}`)}`
    )
})

client.on('connect', () => {
    console.log(
        ``
    )
})

await client.connect()