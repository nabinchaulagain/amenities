const sendResponse = require('../utils/sendResponse');

const handleError = (err, req, res, next) => {
  sendResponse(res, err.message, err.statusCode || 500);
};

module.exports = handleError;
