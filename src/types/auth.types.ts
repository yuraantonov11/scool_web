import { User } from '../models/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface IAuthContext {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    user: User;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;
