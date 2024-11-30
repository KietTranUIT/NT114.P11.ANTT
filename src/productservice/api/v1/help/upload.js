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

const videoMimeTypes = ["video/mp4", "video/x-matroska"]

// Check if a file is accepted base on MIME
module.exports.checkFileType = (file, fileTypes) => {
    for (let fileType of fileTypes) {
        let arr
        switch (fileType) {
            case "image":
                arr = imageMimeTypes
                break
            case "video":
                arr = videoMimeTypes
                break    
        }
        if (arr.includes(file.mimetype)) {
            return true
        }
    }
    return false
}

// Check if a file is image
module.exports.isImageFile = (file) => {
    return imageMimeTypes.includes(file.mimetype)
}

// Check if a file is video
module.exports.isVideoFile = (file) => {
    return videoMimeTypes.includes(file.mimetype)
}

// Upload file to cloudinary version 1.0.0
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

// Upload file to cloudinary version 1.0.1
module.exports.uploadFileV101 = async (buffer, folder) => {
    const uploadResult = await new Promise (resolve => {
        cloudinary.uploader.upload_stream({ folder }, (error, uploadResult) => {
            if (error) {
                return resolve(error)
            }
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadResult
}

// Upload file video to cloudinary
module.exports.uploadVideoBuffer = async (buffer, folder) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
            resource_type: 'video',
            folder
         }, // Định dạng tài nguyên là video
        (error, result) => {
          if (error) {
            reject(error); // Trả về lỗi nếu có
          } else {
            resolve(result); // Trả về kết quả upload thành công
          }
        }
      );
      stream.end(buffer);
    });
  };

// Resize image file
module.exports.resizeImage = async (buffer, size) => {
    const resizedImage = await sharp(buffer)
    .resize(size.width, size.length)
    .toBuffer()

    return resizedImage
}