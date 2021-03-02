const sendResponse = require('../utils/sendResponse');

const verifyId = (req, res, next) => {
  if (isNaN(+req.params.id)) {
    sendResponse(res, { message: 'id in url is invalid' });
    return;
  }
  next();
};

module.exports = verifyId;
