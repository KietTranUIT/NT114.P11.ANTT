const nodemailer = require('nodemailer');

const keys = require('../../../config/key');
const { sender, sender_password } = keys.mail;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: sender,
        pass: sender_password,
    }
})

module.exports = transporter