const ErrorObj = require('../models/errors');
const errorCodes = require('../../../config/errors');
const slugify = require('slugify');

// Control values in parameter
module.exports.strongParameters = (params, requires) => {
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
        if (!requires.includes(keys[i])) {
            delete params[keys[i]]
        }
    }
    return params
}

// Check the required parameters
module.exports.checkRequiredParameters = (params, requires) => {
    const errors = []
    for (let i = 0; i < requires.length; i++) {
        if (!params[requires[i]]) {
            const error = new ErrorObj(errorCodes.missingField, 422, "Missing field", `missing ${requires[i]} attribute`)
            errors.push(error)
        }
    }

    if (errors.length > 0) {
        return [false, errors]
    }
    return [true]
}

// Generate automaticaly slug
module.exports.generateSlug = (name) => {
    const slug = slugify(name, {
        lower: true, strict: true, locale: 'en'
    })
    return slug
}