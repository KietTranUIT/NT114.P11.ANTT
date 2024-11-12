const errorCodes = {
    missingField: 101, // Missing attributes is required in request body
    invalidFile: 102,  // File type is not accepted
    internalError: 103, // Internal error
    duplicateEntry: 104, // Duplicate record in database
    invalidData: 105, // Invalid data in request body
    notFound: 106 // Not found record in database
}

module.exports = errorCodes;
