import api from '../api';

export const ASK_QUESTION = 'ASK_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const GET_COMMENTS = 'GET_COMMENTS';

export const askQuestion = (adId, text) => {
  return async (dispatch) => {
    const res = await api.post(`/api/ads/${adId}/questions`, { text });
    dispatch({ type: ASK_QUESTION, payload: res.data.question });
  };
};

export const answerQuestion = (questionId, text) => {
  return async (dispatch) => {
    const res = await api.post(`/api/questions/${questionId}/answers`, {
      text
    });
    dispatch({
      type: ANSWER_QUESTION,
      payload: { questionId, answer: res.data.answer.answer }
    });
  };
};

export const getComments = (adId) => {
  return async (dispatch) => {
    const res = await api.get(`/api/ads/${adId}/comments`);
    dispatch({ type: GET_COMMENTS, payload: res.data });
  };
};
