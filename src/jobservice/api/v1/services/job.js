const Queue = require('bull');
const chalk = require('chalk');

const keys = require('../../../config/key');
const transporter = require('../services/email');
const templates = require('../constants/templates');
const axios = require('axios');


const sendMailQueueName = 'sendmail_jobs'
const recommendationQueueName = 'recommendation_jobs'

let countJobs = 0

// Process send email
const sendEmailQueue = new Queue(sendMailQueueName, keys.redisURL, {
    redis: {
        tls: {
            rejectUnauthorized: false
        }
    }
})

// Schedular calculate recommendation products
const recommendation = new Queue(recommendationQueueName, keys.redisURL, {
    redis: {
        tls: {
            rejectUnauthorized: false
        }
    }
})

recommendation.process(async (job) => {
    console.log('Scheduled a job to run every 1 minutes');
    const api_urls = [
        'http://localhost:9010/collaborative',
        'http://localhost:9010/contentbased',
        'http://localhost:9010/rankbased'
    ]
    await Promise.all(api_urls.map(async (url) => { 
        axios.get(url)
    }))
});

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

// Tạo job định kỳ mỗi 5 phút
module.exports.scheduleJob = async () => {
    await recommendation.add(
      { task: 'Fetch data every 5 minutes' }, // Dữ liệu của job
      {
        repeat: { cron: '*/60 * * * *' }, // Cron biểu thức: chạy mỗi 5 phút
      }
    );
  };