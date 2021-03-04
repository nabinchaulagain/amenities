/* eslint-disable camelcase */
const db = require('../db');

const createQuestion = async (text, userId, adId) => {
  const newQuestions = await db('questions').insert(
    {
      question: text,
      user_id: userId,
      ad_id: adId
    },
    ['id', 'question']
  );
  return newQuestions[0];
};

const deleteQuestion = async (id) => {
  await db('answers').delete().where({ question_id: id }); // delete answer to  any question
  await db('questions').delete().where({ id });
};

const createAnswer = async (text, questionId) => {
  const newAnswers = await db('answers').insert(
    {
      answer: text,
      question_id: questionId
    },
    ['id', 'answer']
  );
  return newAnswers[0];
};

const deleteAnswer = (id) => {
  return db('answers').delete().where({ id });
};

const getComments = (adId) => {
  return db('questions')
    .leftJoin('answers', 'questions.id', 'answers.question_id')
    .innerJoin('users', 'questions.user_id', 'users.id')
    .select('questions.id AS id', 'question', 'answer', 'username')
    .where({ 'questions.ad_id': adId });
};

module.exports = {
  createQuestion,
  deleteQuestion,
  createAnswer,
  deleteAnswer,
  getComments
};
