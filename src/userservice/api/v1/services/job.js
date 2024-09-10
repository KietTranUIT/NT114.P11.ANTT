const Queue = require('bull');
const chalk = require('chalk');

const keys = require('../../../config/key');
const transporter = require('../services/email');
const templates = require('../constants/templates');


const sendMailQueueName = 'sendmail_jobs'

let countJobs = 0

// Process send email
const sendEmailQueue = new Queue(sendMailQueueName, keys.redisURL, {
    redis: {
        tls: {
            rejectUnauthorized: false
        }
    }
})

sendEmailQueue.process(async (job, done) => {
    const data = job.data
    console.log(
        `${chalk.yellow(
            `> processing ${sendMailQueueName} (jobId:${data.jobId})`
        )}`
    )
    
    const mailOptions = {
        from: keys.mail.sender,
        to: data.email,
        subject: 'Welcome to K2H',
        html: templates.welcomeEmail({fullName: data.fullName, email: data.email})
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw error
    }
    done()
})

sendEmailQueue.on('completed', (job, result) => {
    const data = job.data
    console.log(
        `${chalk.yellow(
            `> ${sendMailQueueName} (jobId:${data.jobId}) completed`
        )}`
    )
})

sendEmailQueue.on('failed', (job, err) => {
    const data = job.data
    console.log(
        `${chalk.red(
            `> ${sendMailQueueName} (jobId: ${data.jobId}) failed. err = ${err}`
        )}`
    )
})

module.exports = {
    countJobs,
    sendEmailQueue,
}