const bcrypt = require('bcrypt');

const User = require('../models/users');
const Role = require('../models/roles');
const { REQUIRED_PARAMETERS } = require('../constants');
const codeErrors = require('../constants/errors');
const { validateBody, validateEmail, validatePassword } = require('../helpers/validation');
const keys = require('../../../config/key');
const { ROLES } = require('../constants');
const backgroundJobs = require('../services/job');
const { generateJWT } = require('../helpers/password');

module.exports.defaultRoute = async (req, res) => {
    const users = await User.findAll({include: Role});
    res.status(200).json(users)
}

// Register account for customer
module.exports.register = async (req, res) => {
    let check = validateBody(req, REQUIRED_PARAMETERS.register)
    if (!check.status) {
        res.status(400).json({errors: check.errors})
        return
    }

    // Validate register parameter
    let { email, fullName, password, confirmPassword } = check.data.attributes
    let errors = []
    // Check email format
    if (!validateEmail(email)) {
        errors.push({
            status: 422,
            source: '/data/attributes/email',
            detail: 'Email format is incorrect.'
        })
    }

    // Check password policy
    const validPassword = validatePassword(password)
    if (!validPassword.status) {
        errors.push({
            status: 422,
            source: 'data/attributes/password',
            detail: validPassword.error,
        })
    }

    // Confirm password
    if (password != confirmPassword) {
        errors.push({
            status: 422,
            source: 'data/attributes/confirmPassword',
            detail: 'Confirm password not match password.',
        })
    }

    if (errors.length != 0) {
        res.status(422).json({errors})
        return
    }

    try {
        // Check if email existed
        let user = await User.findOne({
            attributes: ['id'],
            where: {
                email
            }
        })

        if (user) {
            res.status(422).json({
                status: 'fail',
                errors: [{
                    code: codeErrors.duplicateError.code,
                    title: codeErrors.internalError.title,
                    source: '/data/attributes/email',
                    detail: 'Email has been registered.'
                }]
            })
            return
        }

        const salt = await bcrypt.genSalt(keys.bcrypt.saltRounds)
        let hashedPassword = await bcrypt.hash(password, salt)

        // Creat user
        user = await User.create({
            email,
            fullName,
            password: hashedPassword,
            roleId: ROLES.Customer
        })

        // New a job
        const job = {
            jobId: ++backgroundJobs.countJobs,
            email,
            fullName,
        }
        await backgroundJobs.sendEmailQueue.add(job)

        user.password = undefined
        res.status(201).json({
            status: 'success',
            data: {
                type: 'users',
                id: user.id,
                attributes: user
            }
        })
    } catch(error) {
        res.status(500).json({
            errors: {
                code: codeErrors.internalError.code,
                title: codeErrors.internalError.title,
                source: 'server',
                detail: error.message
            }
        })
    }
}

// Login handler
module.exports.login = async (req, res) => {
    // Require two parameters are email and password
    const check = validateBody(req, REQUIRED_PARAMETERS.login)
    if (!check.status) {
        res.status(400).json({errors: check.errors})
        return
    }

    let { email, password } = check.data.attributes

    // Check if email format is correct
    if (!validateEmail(email)) {
        res.status(422).json({
            errors: {
                code: codeErrors.validationError.code,
                title: codeErrors.validationError.title,
                source: '/data/attributes/email',
                detail: 'Email format is incorrect.'
            }
        })
        return
    }
    try {
        let user = await User.findOne({
            where: {
                email
            }
        })

        // Check if user is exists
        if (!user) {
            res.status(422).json({
                errors: [{
                    code: codeErrors.loginError.code,
                    title: codeErrors.loginError.title,
                    source: '/data/attributes/email',
                    detail: 'User is not exists.'
                }]
            })
            return
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(422).json({
                errors: {
                    code: codeErrors.loginError.code,
                    title: codeErrors.loginError.title,
                    source: '/data/attributes/password',
                    detail: 'Password is incorrect.'
                }
            })
            return
        }

        const payload = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
        }

        const accessToken = generateJWT(payload, '1h', 'access_token') // Access token expires in 1 hour
        const refreshToken = generateJWT(payload, '24h', 'refresh_token') // Refresh token expires in 24 hours

        const resToken = `access_token=${accessToken};refresh_token=${refreshToken}`
        res.setHeader('Authorization', resToken)
        user.password = undefined
        res.status(200).json({
            data: {
                type: 'users',
                id: user.id,
                attributes: {
                    user
                }
            }
        })
    } catch(error) {
        res.status(500).json({
            errors: {
                code: codeErrors.internalError.code,
                title: codeErrors.internalError.title,
                source: 'server',
                detail: error.message
            }
        })
    }
}