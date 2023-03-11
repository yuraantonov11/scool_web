import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
