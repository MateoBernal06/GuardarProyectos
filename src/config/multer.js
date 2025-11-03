
const multer = require('multer')
const cloudinary = require('./cloudinary.js')
const {CloudinaryStorage} = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "cloudinary_images",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            { width: 300, height: 300, crop: "thumb", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" },
        ],
    },
}); 

const upload = multer({ storage })

module.exports = upload