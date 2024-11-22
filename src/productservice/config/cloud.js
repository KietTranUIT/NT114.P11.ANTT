const cloudinary = require('cloudinary').v2;
const { default: axios } = require('axios');
const keys = require('./key');
const chalk = require('chalk');

const cloud = keys.cloud;

cloudinary.config({
    cloud_name: cloud.cloud_name,
    api_key: cloud.api_key,
    api_secret: cloud.api_secret
})

const checkConnection = async () => {
    const ping_url = `https://${cloud.api_key}:${cloud.api_secret}@api.cloudinary.com/v1_1/${cloud.cloud_name}/ping`
    // Ping to cloudinary
    try {
        const res = await axios.get(ping_url)
        if (res.data.status != 'ok') {
            throw new Error('ping to cloudinary failed!')
        }
        console.log(
            `[${chalk.green('✓')}] ${chalk.blue('Cloud connection has been established successfully.')}`
        )
        return
    } catch (error) {
        console.log(
            `[${chalk.red('x')}] ${chalk.blue(`Unable to connect to cloud, err = ${error.message}`)}`
        )
    }
}

module.exports = {
    cloudinary,
    checkConnection
}