const validateBody = require('../utils/validateBody');
const joi = require('joi');
const { deleteFromStorage } = require('../utils/uploadStorage');

const adSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  description: joi.string().min(6).max(300).required(),
  price: joi.number().min(1).required(),
  location: joi.string().min(5).max(100).required()
});

const validateAd = (req, res, next) => {
  try {
    if (req.method === 'POST') {
      const validationSchema = adSchema.keys({ image: joi.required() });
      validateBody(validationSchema, { image: req.file, ...req.body });
    } else {
      validateBody(adSchema, req.body);
    }
    next();
  } catch (err) {
    if (req.uploadError) {
      err.message.detail.image = req.uploadError;
    } else {
      // delete uploaded object if any error in body and file is present
      if (req.file) {
        deleteFromStorage(req.file.key);
      }
    }
    next(err);
  }
};

module.exports = validateAd;
