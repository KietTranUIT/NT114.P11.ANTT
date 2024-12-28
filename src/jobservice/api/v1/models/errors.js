const errorCodes = require('./../../../config/errors');

// Error object in response error
class ErrorObj {
    constructor(code, status, title, detail=undefined, source=undefined) {
        // Error Code in application
        this.code = code
        // HTTP Status code applicable with error
        this.status = status
        // Short Summary describes error
        this.title = title
        // Detail information about encoutered error
        this.detail = detail
        // References to attributes encoutered error
        // pointer: references to attributes in request body
        // parameter: references to attributes in URI query
        // header: references to attributes in request header
        this.source = source
    }

    static createInternalError(message) {
        return {
            code: errorCodes.internalError,
            status: 500,
            title: "Internal error",
            detail: message
        }
    }
}

module.exports = ErrorObj;