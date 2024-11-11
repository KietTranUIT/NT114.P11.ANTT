const multer = require('multer');

const uploadMulter = multer({})

// Middleware catch single file upload
module.exports.uploadSingleFile = (fieldName) => {
    return async (req, res, next) => {
        const upload = uploadMulter.single(fieldName)
        upload(req, res, (err) => {
            if (!err) {
                next()
                return
            }
            res.status(400).json({message: "fieldName isn't accepted!"})
        })
    }
}
