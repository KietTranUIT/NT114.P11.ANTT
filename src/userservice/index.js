const express = require('express');
const app = express();
const chalk = require('chalk');

const keys = require('./config/key');
const { port } = keys;
const routerV1 = require('./api/v1/routes');
const db = require('./config/db');
const rd = require('./config/redis');

const apiVersions = {
    "1.0.0": "/v1",
}

const redirectVersion = (req, res, next) => {
    let version = req.headers['api-version']
    if (!version) {
        version = '1.0.0'
    }

    if (!apiVersions[version]) {
        res.status(400).json({
            status: 400,
            error: 'Api version not exists.'
        })
    }

    const path = req.path
    req.url = apiVersions[version] + path
    next()
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(redirectVersion);
app.use('/v1', routerV1);

// connect to database
db.connect(db.sequelize);

// connect to redis
rd.connectRedis(rd.redisClient);

app.listen(port, () => {
    console.log(
        `[${chalk.green('✓')}] ${chalk.blue(
            `User Service is running on ${chalk.bold(port)}. Visit http://localhost:${port} in your browser.`
        )}`
    )
})
