import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { AuthState } from './types/auth.types';

export interface RootState {
  auth: AuthState;
  // Other slices of state...
}

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
