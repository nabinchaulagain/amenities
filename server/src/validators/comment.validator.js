const joi = require('joi');
const db = require('../db');
const APIError = require('../utils/APIError');
const validateBody = require('../utils/validateBody');

const commentSchema = joi.object({
  text: joi.string().min(3).max(100).required()
});

const validateCommentData = (req, res, next) => {
  try {
    validateBody(commentSchema, req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const validateQuestionAction = async (req, res, next) => {
  const adId = +req.params.adId;
  try {
    if (isNaN(adId)) {
      throw new APIError({ error: 'invalid ad id' }, 400);
    }
    const ad = (await db('ads').select('id').where({ id: adId }).limit(1))[0];
    if (!ad) {
      throw new APIError({ error: 'Ad does not exist' }, 404);
    }
    if (req.params.id) {
      const answer = (
        await db('questions')
          .select()
          .where({ id: +req.params.id })
          .limit(1)
      )[0];
      if (!answer) {
        throw new APIError({ error: 'question does not exist' }, 404);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateAnswerAction = async (req, res, next) => {
  const questionId = +req.params.questionId;
  try {
    if (isNaN(questionId)) {
      throw new APIError({ error: 'invalid question id' }, 400);
    }
    const question = (
      await db('questions')
        .select('ads.user_id AS user_id')
        .innerJoin('ads', 'questions.ad_id', 'ads.id')
        .where({ 'questions.id': questionId })
        .limit(1)
    )[0];
    if (!question) {
      throw new APIError({ error: 'question not found' }, 404);
    }
    if (question.user_id !== req.user.id) {
      throw new APIError({ error: 'unauthorized' }, 403);
    }
    if (req.params.id) {
      const answer = (
        await db('answers')
          .select()
          .where({ id: +req.params.id })
          .limit(1)
      )[0];
      if (!answer) {
        throw new APIError({ error: 'answer does not exist' }, 404);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateQuestionAction,
  validateCommentData,
  validateAnswerAction
};
