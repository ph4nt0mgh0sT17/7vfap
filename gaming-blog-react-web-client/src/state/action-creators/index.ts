import {Dispatch} from "redux";
import {Action} from "../actions";
import {ActionTypes} from "../action-types";
import {LoginResponse} from "../../Models/Responses/LoginResponse";

export const login = (user: LoginResponse) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: user
        });
    };
}

export const logout = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.LOGOUT,
        });
    };
}