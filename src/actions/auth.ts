import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
    AuthActionTypes,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../types/auth.types";

export const login = (
    email: string,
    password: string
): ThunkAction<void, RootState, unknown, AuthActionTypes> => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // todo: uncomment when api will done
        // const { data } = await axios.post(
        //     "/api/auth/login",
        //     { email, password },
        //     config
        // );
        const data = {
            token: '',
            id: 123,
            email: 'mail.example.com'
        };

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const register = (
    name: string,
    email: string,
    password: string
): ThunkAction<void, RootState, unknown, AuthActionTypes> => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/auth/register",
            { name, email, password },
            config
        );

        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({
            type: REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};