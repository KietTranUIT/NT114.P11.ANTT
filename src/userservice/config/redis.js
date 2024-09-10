const { createClient } = require('redis');
const chalk = require('chalk');

const keys = require('./key');

const client = createClient({
    url: keys.redisURL
})

client.on('error', err => {
    console.log(
        `[${chalk.red('X')}] ${chalk.blue(
            `Connection to redis failed, err = ${err.message}.`)}`
    )
})

client.on('connect', () => {
    console.log(
        `[${chalk.green('✓')}] ${chalk.blue('Redis connection has been established successfully.')}`
    )
})

module.exports = {
    redisClient: client,
    connectRedis: async (client) => {
        await client.connect()
    }
}