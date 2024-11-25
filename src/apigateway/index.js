const express = require('express');
const app = express();
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const keys = require('./config/key');
const port = keys.port
const {services} = require('./config/services');
const { authenticate } = require('./middleware');

app.use(cors({
    origin: 'http://localhost:9002',
    exposedHeaders: ['Authorization'],
}));

services.forEach(({route, target, rewrite}) => {
    let proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/': `${rewrite}`
        },
        on: {
            proxyReq: (proxyReq, req, res) => {
                console.log(proxyReq.path)
            }
        }
    }

    // if (!auth) {
    //     // apply proxy middleware
    //     app.use(route, createProxyMiddleware(proxyOptions))
    // } else {
    //     app.use(route, authenticate, createProxyMiddleware(proxyOptions))
    // }
    app.use(route, authenticate, createProxyMiddleware(proxyOptions))
})

app.listen(port, () => {
    console.log(
        `[${chalk.green('✓')}] ${chalk.blue(
            `Server is running on ${chalk.bold(port)}. Visit http://localhost:${port} in your browser.`
        )}`
    )
})

