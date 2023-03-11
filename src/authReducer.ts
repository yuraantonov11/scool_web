import { User } from './models/user';
import { AuthActionTypes, LOGIN, LOGOUT } from './types/auth.types';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

export const authReducer = (
  state = initialAuthState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
};
