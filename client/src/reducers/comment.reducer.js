import {
  ANSWER_QUESTION,
  ASK_QUESTION,
  GET_COMMENTS
} from '../actions/comment.action';

const INITIAL_STATE = { list: [] };

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, list: action.payload };
    case ASK_QUESTION:
      return { ...state, list: [action.payload, ...state.list] };
    case ANSWER_QUESTION:
      const newList = state.list.map((item) => {
        if (item.id === action.payload.questionId) {
          return { ...item, answer: action.payload.answer };
        }
        return item;
      });
      return { ...state, list: newList };
    default:
      return state;
  }
};

export default commentReducer;
