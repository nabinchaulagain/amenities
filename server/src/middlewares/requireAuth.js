const sendResponse = require('../utils/sendResponse');

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    sendResponse(res, { error: 'unauthenticated' }, 401);
  }
};

module.exports = requireAuth;
