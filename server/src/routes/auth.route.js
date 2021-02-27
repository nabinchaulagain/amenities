const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const {
  validateSignupData,
  validateDuplicateData
} = require('../validators/auth.validator');
const router = Router();

// POST => /api/auth/signup
router.post(
  '/signup',
  validateSignupData,
  validateDuplicateData,
  authController.signup
);

module.exports = router;
