const sendResponse = require('../utils/sendResponse');
const {
  createUser,
  getUser,
  doesPasswordMatch,
  encodeJWT
} = require('../services/auth.service');
const APIError = require('../utils/APIError');

const authController = {
  signup: async (req, res, next) => {
    try {
      const user = await createUser(req.body);
      sendResponse(res, { message: 'Successfully created account', user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await getUser(username, 'username');
      if (!user) {
        throw new APIError(
          {
            error: 'Username error',
            detail: { username: 'Username not found' }
          },
          404
        );
      }
      if (!(await doesPasswordMatch(password, user.password))) {
        throw new APIError(
          {
            error: "Password didn't match",
            detail: { password: 'Password was incorrect' }
          },
          401
        );
      }
      const token = encodeJWT({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at
      });
      sendResponse(res, { message: 'Successfully logged in', token });
    } catch (err) {
      next(err);
    }
  },

  getCurrentUser: (req, res, next) => {
    try {
      sendResponse(res, {
        isLoggedIn: req.user ? true : false,
        user: req.user
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;
