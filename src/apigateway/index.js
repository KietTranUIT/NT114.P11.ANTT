const express = require('express');
const app = express();
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');

const keys = require('./config/key');
const port = keys.port
const services = require('./config/services');

services.forEach(({route, target}) => {
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    }

    // apply proxy middleware
    app.use(route, createProxyMiddleware(proxyOptions))
})

app.listen(port, () => {
    console.log(
        `[${chalk.green('✓')}] ${chalk.blue(
            `Server is running on ${chalk.bold(port)}. Visit http://localhost:${port} in your browser.`
        )}`
    )
})

