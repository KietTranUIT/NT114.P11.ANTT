const express = require('express');
const app = express();
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const keys = require('./config/key');
const port = keys.port
const {services} = require('./config/services');
const { authenticate } = require('./middleware');
const router = require('./routes');

app.use(cors({
    origin: ['https://www.sandbox.paypal.com', 'http://localhost:9002', 'http://localhost:9008', 'https://accounts.google.com'],
}));
// app.use(cors());

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
            if (req.user) {
                proxyReq.setHeader('x-user', JSON.stringify(req.user))
            }
            },
            // onProxyRes: (proxyRes, req, res) => {
            //     proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Thêm header CORS
            //     proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'; // Cho phép cookie
            //   },
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

// app.use('/', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// },router)

app.listen(port, () => {
    console.log(
        `[${chalk.green('✓')}] ${chalk.blue(
            `Server is running on ${chalk.bold(port)}. Visit http://localhost:${port} in your browser.`
        )}`
    )
})

