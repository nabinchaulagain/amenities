import { LOGOUT, UPDATE_AUTH_STATUS } from '../actions/auth.actions';
const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: true
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isLoading: false,
        user: action.payload.user
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
