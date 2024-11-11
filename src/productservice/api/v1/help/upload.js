const { cloudinary } = require('./../../../config/cloud');
const sharp = require('sharp');

const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
    "image/heif",
    "image/heic",
    "image/jp2",
    "image/avif",
    "image/apng"
];

// Check if a file is accepted base on MIME
module.exports.checkFileType = (file, fileTypes) => {
    for (let fileType of fileTypes) {
        let arr
        switch (fileType) {
            case "image":
                arr = imageMimeTypes
                break        
        }
        if (arr.includes(file.mimetype)) {
            return true
        }
    }
    return false
}

// Upload file to cloudinary
module.exports.uploadFile = async (buffer) => {
    const uploadResult = await new Promise (resolve => {
        cloudinary.uploader.upload_stream({ folder: "brands"}, (error, uploadResult) => {
            if (error) {
                return resolve(error)
            }
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadResult
}

// Resize image file
module.exports.resizeImage = async (buffer, size) => {
    const resizedImage = await sharp(buffer)
    .resize(size.width, size.length)
    .toBuffer()

    return resizedImage
}