const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const {
  validateSignupData,
  validateDuplicateData,
  validateLoginData
} = require('../validators/auth.validator');
const router = Router();

// POST => /api/auth/signup
router.post(
  '/signup',
  validateSignupData,
  validateDuplicateData,
  authController.signup
);

// POST => /api/auth/login
router.post('/login', validateLoginData, authController.login);

// GET => /api/auth
router.get('/', authController.getCurrentUser);

module.exports = router;
