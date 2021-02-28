class APIError extends Error {
  constructor(msg, statusCode = 500) {
    super();
    this.message = msg;
    this.statusCode = statusCode;
  }
}

module.exports = APIError;
