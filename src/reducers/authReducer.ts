import {
    AuthActionTypes,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "../types/auth.types";
import { AuthState } from "../types/auth.types";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
};

export const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: undefined,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: undefined,
                error: action.payload,
            };
        default:
            return state;
    }
};
