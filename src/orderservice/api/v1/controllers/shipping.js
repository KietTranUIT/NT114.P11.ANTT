const ErrorObj = require("../models/errors");
const errorCodes = require("./../../../config/errors");
const ShippingMethod = require("./../models/shipping");

// Get all shipping method
module.exports.get = async (req, res) => {
  try {
    const shipping = await ShippingMethod.findAll({ where: { active: true }});
    return res.status(200).json({
        type: 'shipping method',
        data: shipping
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
