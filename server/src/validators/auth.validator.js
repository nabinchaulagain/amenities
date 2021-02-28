const joi = require('joi');
const { getUser } = require('../services/auth.service');
const APIError = require('../utils/APIError');
const validateBody = require('../utils/validateBody');

const userSchema = joi.object({
  username: joi.string().min(3).max(25).required(),
  password: joi.string().required()
});

const validateSignupData = async (req, res, next) => {
  try {
    await validateBody(
      userSchema.keys({ email: joi.string().email().required() }),
      req.body
    );
    next();
  } catch (err) {
    next(err);
  }
};

const validateLoginData = async (req, res, next) => {
  try {
    await validateBody(userSchema, req.body);
    next();
  } catch (err) {
    next(err);
  }
};
const validateDuplicateData = async (req, res, next) => {
  try {
    const errors = {};
    const { username, email } = req.body;
    const duplicateUsernameUser = await getUser(username, 'username');
    const duplicateEmailUser = await getUser(email, 'email');
    if (duplicateUsernameUser) {
      errors.username = 'Username is already taken';
    }
    if (duplicateEmailUser) {
      errors.email = 'Email is already taken';
    }
    if (Object.keys(errors).length === 0) {
      next();
      return;
    }
    next(new APIError({ error: 'Duplicate data', detail: errors }, 409));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateLoginData,
  validateSignupData,
  validateDuplicateData
};
