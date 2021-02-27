const sendResponse = (res, msg, statusCode = 200) =>
  res.status(statusCode).send(msg);

module.exports = sendResponse;
