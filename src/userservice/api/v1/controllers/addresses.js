const ErrorObj = require("../models/errors");
const errorCodes = require("../../../config/errors");
const UserAddress = require("../models/addresses");
const help = require("../helpers");
const errors = require("../constants/errors");

// Get all address of a user
module.exports.get = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    const address = await UserAddress.findAll({
      where: {
        userId: user.id,
      },
      order: [
        ['isDefault', 'DESC']
      ]
    });
    res.status(200).json({
      type: "user address",
      len: address.length,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Add a new address
module.exports.create = async (req, res) => {
  try {
    const check = help.checkRequiredParameters(req.body, [
      "fullName",
      "phoneNumber",
      "address",
      "province",
    ]);
    if (!check[0]) {
      return res.status(200).json({ errors: check[1] });
    }
    let {
      fullName,
      phoneNumber,
      address,
      province,
      isDefault,
      additionalInformation,
    } = req.body;
    const user = JSON.parse(req.headers["x-user"]);
    // Get address is primary address
    let addressUser = await UserAddress.findOne({
      where: {
        userId: user.id,
        isDefault: true,
      },
    });

    if (isDefault && addressUser) {
      addressUser.isDefault = false;
      await addressUser.save();
    }

    if (!addressUser) {
      isDefault = true;
    }

    const userAddress = await UserAddress.create({
      userId: user.id,
      fullName,
      phoneNumber,
      address,
      province,
      isDefault,
      additionalInformation,
    });
    res.status(201).json({
      type: "user address",
      data: userAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Update a address
module.exports.update = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    const id = req.params.addressId;
    const params = help.strongParameters(req.body, [
      "fullName",
      "phoneNumber",
      "address",
      "province",
      "additionalInformation",
      "isDefault",
    ]);
    if (params.isDefault) {
      await UserAddress.update(
        {
          isDefault: false,
        },
        {
          where: {
            isDefault: true,
            userId: user.id,
          },
        }
      );
    }
    const result = await UserAddress.update(
      { ...params },
      { where: { id, userId: user.id }, returning: true }
    );
    res.status(200).json({
      type: "user address",
      data: result[1],
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Delete a user address
module.exports.delete = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    const id = req.params.addressId;
    const userAddress = await UserAddress.findOne({
      where: {
        userId: user.id,
        id,
      },
    });
    if (userAddress.isDefault) {
      const err = new ErrorObj(
        errorCodes.invalidData,
        422,
        "Cannot action",
        "Không thể xóa địa chỉ mặc định",
        {}
      );
      return res.status(422).json({ errors: [err] });
    }
    userAddress.destroy();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
