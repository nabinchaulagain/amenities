const { decodeJWT } = require('../services/auth.service');
const APIError = require('../utils/APIError');

const parseUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const user = decodeJWT(token);
      if (!user.id || !user.username || !user.email) {
        throw new APIError({ msg: 'Invalid token' }, 401);
      }
      req.user = user;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = parseUser;
