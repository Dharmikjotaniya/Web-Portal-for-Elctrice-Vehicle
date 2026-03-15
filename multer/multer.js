const multer = require("multer");

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },

});

const imageUpload = multer({
    storage: imageStorage,
});

module.exports = { imageUpload };
