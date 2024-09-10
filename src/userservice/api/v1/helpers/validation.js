const emailFormatRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

module.exports.validateBody = (req, required) => {
    const { data } = req.body

    if (!data) {
        return {
            status: false,
            errors: [
                {
                    status: 400,
                    source: '/data',
                    title: 'Request body misses field',
                    detail: 'Missing data field.'
                }
            ]
        }
    }

    let errors = []
    for (let i = 0; i < required.length; i++) {
        if (!required[i] in data.attributes) {
            let error = {
                status: 400,
                source: `/data/attributes/${required[i]}`,
                title: 'Request body misses field',
                detail: `Missing ${required[i]} field.`
            }
            errors.push(error)
        }
    }
    
    if (errors.length != 0) {
        return {
            status: false,
            errors
        }
    }
    return {
        status: true,
        data: data
    }
}

module.exports.validateEmail = (email) => {
    return emailFormatRegex.test(email)
}

// Validate password input abide by password policy
module.exports.validatePassword = (password) => {
    // Check length of password (must greater 8 and less 72 characters)
    const length = password.length
    if (length < 8 || length > 72) {
        return {
            status: false,
            error: 'Password must be at least 8 and largest 72 characters.'
        }
    }

    let haveLowercase, haveUppercase, haveSymbol, haveDigit = false
    for (let i = 0; i < password.length; i++) {
        const character = password[i]
        // Is lower case
        if (character >= 'a' && character <= 'z') {
            haveLowercase = true
        } else if (character >= 'A' && character <= 'Z') {
            haveUppercase = true
        } else if (character >= '0' && character <= '9') {
            haveDigit = true
        } else {
            haveSymbol = true
        }
    }

    const ok = haveLowercase && haveUppercase && haveDigit && haveSymbol
    if (!ok) {
        return {
            status: false,
            error: 'Password must be at least 1 lower case, 1 uppercase, 1 digit and 1 symbol.'
        }
    }

    return {status: true}
}