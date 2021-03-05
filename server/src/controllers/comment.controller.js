const {
  createQuestion,
  deleteQuestion,
  createAnswer,
  deleteAnswer,
  getComments
} = require('../services/comment.service');
const sendResponse = require('../utils/sendResponse');

const commentController = {
  addQuestion: async (req, res, next) => {
    try {
      const newQuestion = await createQuestion(
        req.body.text,
        req.user.id,
        +req.params.adId
      );
      sendResponse(res, {
        message: 'added successfully',
        question: { ...newQuestion, username: req.user.username }
      });
    } catch (err) {
      next(err);
    }
  },
  removeQuestion: async (req, res, next) => {
    try {
      await deleteQuestion(+req.params.id);
      sendResponse(res, { message: 'successfully deleted' });
    } catch (err) {
      next(err);
    }
  },
  addAnswer: async (req, res, next) => {
    try {
      const answer = await createAnswer(req.body.text, +req.params.questionId);
      sendResponse(res, { message: 'added successfully', answer });
    } catch (err) {
      next(err);
    }
  },
  removeAnswer: async (req, res, next) => {
    try {
      await deleteAnswer(+req.params.id);
      sendResponse(res, { message: 'deleted successfully' });
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const comments = await getComments(+req.params.adId);
      sendResponse(res, comments);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = commentController;
