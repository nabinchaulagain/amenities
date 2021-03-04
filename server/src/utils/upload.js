const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('./uploadStorage');

const crypto = require('crypto');
const path = require('path');

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME,
  acl: 'public-read',
  contentDisposition: 'inline',
  contentType: (req, file, cb) => {
    cb(null, file.mimetype);
  },
  key: (req, file, cb) => {
    cb(
      null,
      `${crypto.randomBytes(10).toString('hex')}${path.extname(
        file.originalname
      )}`
    );
  }
});

const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.uploadError = 'file should be a image(jpg or png)';
    cb(null, false);
  } else {
    cb(null, true);
  }
};

module.exports = { upload: multer({ fileFilter, storage }), s3 };
