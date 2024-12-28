const backgroundJobs = require("../services/job");
const helper = require("../helpers");
const errorObj = require("../models/errors");
const errorCodes = require("../../../config/errors");

module.exports.handleJob = async (req, res) => {
  try {
    let check = helper.checkRequiredParameters(req.body, ["type"]);
    if (!check[0]) {
      return res.status(400).json({ errors: check[1] });
    }

    if (req.body.type === "send mail welcome") {
      const { email, fullName } = req.body.data;
      const job = {
        jobId: ++backgroundJobs.countJobs,
        email,
        fullName,
      };
      await backgroundJobs.sendEmailQueue.add(job);
    }
    res.status(200).json({ message: 'job is added into queue'})
  } catch (error) {
    res.status(500).json(errorObj.createInternalError(error.message));
  }
};
