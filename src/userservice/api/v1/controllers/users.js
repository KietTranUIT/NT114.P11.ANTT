const bcrypt = require("bcrypt");

const User = require("../models/users");
const Role = require("../models/roles");
const { REQUIRED_PARAMETERS } = require("../constants");
const codeErrors = require("../constants/errors");
const {
  validateBody,
  validateEmail,
  validatePassword,
} = require("../helpers/validation");
const keys = require("../../../config/key");
const { ROLES } = require("../constants");
const backgroundJobs = require("../services/job");
const { generateJWT, verifyJWT } = require("../helpers/password");
const helper = require("../helpers");
const errorObj = require("../models/errors");
const errorCodes = require("../../../config/errors");
const axios = require("axios");
const key = require("../../../config/key");
const { OAuth2Client } = require('google-auth-library');
const Cart = require("../models/carts");
const CartItem = require("../models/cart_items");

const oauth2Client = new OAuth2Client(key.google.clientId, key.google.clientSecret, key.google.callBackURL);

module.exports.defaultRoute = async (req, res) => {
  //const users = await User.findAll({include: Role});
  res.status(200).json("Message Hello");
};

// Xác thực token có phải là admin hay không
module.exports.validateTokenAdmin = async (req, res) => {
  try {
    const { token } = req.query
    const user = verifyJWT(token, 'access_token')
    if (user.roleId != 1) {
      return res.status(402).json({ message: 'Permission denied' });
    }
    res.status(200).json({ message: 'Allowed' })
  } catch (error) {
    res.status(500).json(errorObj.createInternalError(error.message));
  }
}

// Register account for customer
module.exports.register = async (req, res) => {
  // Validate params
  let check = helper.checkRequiredParameters(req.body, [
    "fullName",
    "email",
    "password",
    "confirmPassword",
  ]);
  // let check = validateBody(req, REQUIRED_PARAMETERS.register)
  if (!check[0]) {
    res.status(400).json({ errors: check[1] });
    return;
  }

  let params = helper.strongParameters(req.body, [
    "fullName",
    "email",
    "password",
    "confirmPassword",
  ]);

  // Validate register parameter
  // let { email, fullName, password, confirmPassword } = check.data.attributes
  let errors = [];
  // Check email format
  if (!validateEmail(params.email)) {
    const err = new errorObj(
      errorCodes.invalidData,
      422,
      "Invalid data",
      "email không hợp lệ.",
      { pointer: "/email" }
    );
    errors.push(err);
  }

  // Check password policy
  const validPassword = validatePassword(params.password);
  if (!validPassword.status) {
    if (validPassword.error.includes("lower case")) {
      let err = new errorObj(
        errorCodes.invalidData,
        422,
        "Invalid data",
        "Mật khẩu bắt buộc phải có ít nhất 1 kí tự thường, 1 kí tự hoa, 1 số và 1 kí tự đặc biệt",
        { pointer: "/password" }
      );
      errors.push(err);
    }
  }

  // Confirm password
  if (params.password != params.confirmPassword) {
    let err = new errorObj(
      errorCodes.invalidData,
      422,
      "Invalid data",
      "Mật khẩu xác nhận không khớp với mật khẩu",
      { pointer: "/confirmPassword" }
    );
    errors.push(err);
  }

  if (errors.length != 0) {
    res.status(422).json({ errors });
    return;
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(keys.bcrypt.saltRounds);
    let hashedPassword = await bcrypt.hash(params.password, salt);

    let user;
    try {
      // Creat user
      user = await User.create({
        email: params.email,
        fullName: params.fullName,
        password: hashedPassword,
        roleId: ROLES.Customer,
      });
    } catch (err_db) {
      if (err_db.name === "SequelizeUniqueConstraintError") {
        let err;
        if (err_db.errors[0].path === "email") {
          err = new errorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate record",
            "email đã có tài khoản đăng kí",
            { pointer: "/email" }
          );
        }
        return res.status(422).json({ errors: [err] });
      }
      throw err_db;
    }

    // Send mail welcome to user
    // await axios.post(`http://localhost:${key.services.jobService}/job`, {
    //   type: "send mail welcome",
    //   data: {
    //     email: params.email,
    //     fullName: params.fullName,
    //   },
    // });
    await Cart.create({ userId: user.id})

    // Hide password of user
    user.password = undefined;
    res.status(201).json({
      type: "user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorObj.createInternalError(error.message));
  }
};

// Login handler
module.exports.login = async (req, res) => {
  // Require two parameters are email and password
  //   const check = validateBody(req, REQUIRED_PARAMETERS.login);
  //   if (!check.status) {
  //     res.status(400).json({ errors: check.errors });
  //     return;
  //   }
  // Require email and password
  let check = helper.checkRequiredParameters(req.body, ["email", "password"]);
  if (!check[0]) {
    return res.status(400).json({ errors: check[1] });
  }

  let { email, password } = req.body;

  // Check if email format is correct
  if (!validateEmail(email)) {
    const err = new errorObj(
      errorCodes.invalidData,
      422,
      "Invalid data",
      "email không hợp lệ",
      { pointer: "/email" }
    );
    // res.status(422).json({
    //   errors: {
    //     code: codeErrors.validationError.code,
    //     title: codeErrors.validationError.title,
    //     source: "/data/attributes/email",
    //     detail: "Email format is incorrect.",
    //   },
    // });
    return res.status(422).json({ errors: [err] });
  }
  try {
    let user = await User.findOne({
      where: {
        email,
      },
    });

    // Check if user is exists
    if (!user) {
      //   res.status(422).json({
      //     errors: [
      //       {
      //         code: codeErrors.loginError.code,
      //         title: codeErrors.loginError.title,
      //         source: "/data/attributes/email",
      //         detail: "user không tồn tại",
      //       },
      //     ],
      //   });
      const err = new errorObj(
        errorCodes.invalidData,
        404,
        "Not found",
        "user không tồn tại",
        { pointer: "/email" }
      );
      return res.status(404).json({ errors: [err] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //   res.status(422).json({
      //     errors: {
      //       code: codeErrors.loginError.code,
      //       title: codeErrors.loginError.title,
      //       source: "/data/attributes/password",
      //       detail: "Password is incorrect.",
      //     },
      //   });
      const err = new errorObj(
        errorCodes.invalidData,
        422,
        "Not match",
        "mật khẩu không chính xác",
        { pointer: "/password" }
      );
      return res.status(422).json({ errors: [err] });
    }

    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    };
    // Get cart of user
    const cart = await Cart.findOne({
      where: { userId: user.id, status: "active" },
      include: [{
        model: CartItem,
      }]
    })

    // Grant token
    const accessToken = generateJWT(payload, "24h", "access_token"); // Access token expires in 1 hour
    const refreshToken = generateJWT(payload, "24h", "refresh_token"); // Refresh token expires in 24 hours

    const resToken = `access_token=${accessToken};refresh_token=${refreshToken}`;
    // res.setHeader("Authorization", resToken);
    user.password = undefined;
    res.status(200).json({
      type: "user",
      data: {
        ...user.dataValues,
      },
      cart,
      token: resToken,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json(errorObj.createInternalError(error.message));
  }
};

// Refresh token
module.exports.refresh = async (req, res) => {
  try {
    let check = helper.checkRequiredParameters(req.body, ["token"]);
    if (!check[0]) {
      return res.status(400).json({ errors: check[1] });
    }

    let { token } = req.body;

    // Validate token
    let payload;
    try {
      payload = verifyJWT(token, "refresh_token");
    } catch (err_jwt) {
      const err = new errorObj(
        errorCodes.invalidData,
        422,
        "Invalid token",
        "refresh token không hợp lệ",
        { pointer: "/token" }
      );
      return res.status(422).json({ errors: [err] });
    }

    // Grant new refresh token
    const accessToken = generateJWT(
      {
        id: payload.id,
        email: payload.email,
        roleId: payload.roleId,
      },
      "24h",
      "refresh_token"
    ); // Refresh token expires in 24 hours

    return res.status(200).json({
      type: "token",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorObj.createInternalError(error.message));
  }
};

// Redirect to google authorization server
module.exports.redirectGoogle = async (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
      });
      res.redirect(url);
    // const state = "some_state";
    // const scopes = key.google.scopes.join(" ");
    // // redirect
    // const url = `${key.google.oauthURL}?client_id=${key.google.clientId}&redirect_uri=${key.google.callBackURL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    // res.redirect(url);
  } catch (error) {
    res
      .status(500)
      .json({
        code: errorCodes.internalError,
        status: 500,
        title: "Internal error",
        detail: message,
      });
  }
};
