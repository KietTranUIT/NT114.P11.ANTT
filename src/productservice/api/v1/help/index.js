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