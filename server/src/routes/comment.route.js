const Router = require('express').Router;
const requireAuth = require('../middlewares/requireAuth');
const verifyId = require('../middlewares/verifyId');
const {
  validateQuestionAction,
  validateCommentData,
  validateAnswerAction
} = require('../validators/comment.validator');
const commentController = require('../controllers/comment.controller');

const router = Router();

// POST => /api/ads/:adId/questions
router.post(
  '/ads/:adId/questions',
  requireAuth,
  validateQuestionAction,
  validateCommentData,
  commentController.addQuestion
);

// DELETE => /api/ads/:adId/questions/:id
router.delete(
  '/ads/:adId/questions/:id',
  requireAuth,
  verifyId,
  validateQuestionAction,
  commentController.removeQuestion
);

// POST => /api/questions/:questionId/answers
router.post(
  '/questions/:questionId/answers',
  requireAuth,
  validateAnswerAction,
  validateCommentData,
  commentController.addAnswer
);

// DELETE => /api/questions/:questionId/answers/:id
router.delete(
  '/questions/:questionId/answers/:id',
  requireAuth,
  verifyId,
  validateAnswerAction,
  commentController.removeAnswer
);

router.get('/ads/:adId/comments', commentController.get);

module.exports = router;
