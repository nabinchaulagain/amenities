const sendResponse = require('../utils/sendResponse');
const { createUser } = require('../services/auth.service');

const authController = {
  signup: async (req, res, next) => {
    try {
      const user = await createUser(req.body);
      sendResponse(res, { msg: 'Success', user });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;
