import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth.reducer';
import adReducer from './reducers/ad.reducer';
import commentReducer from './reducers/comment.reducer';

const reducers = combineReducers({
  auth: authReducer,
  ad: adReducer,
  comments: commentReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
