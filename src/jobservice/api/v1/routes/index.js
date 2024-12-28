const express = require('express');
const router = express.Router();
const job = require('./../controllers/jobs');

router.post('/job', job.handleJob)

module.exports = router;

