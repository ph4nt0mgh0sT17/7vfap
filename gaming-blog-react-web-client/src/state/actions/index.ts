import {ActionTypes} from "../action-types";
import {LoginResponse} from "../../Models/Responses/LoginResponse";

interface LoginAction {
    type: ActionTypes.LOGIN,
    payload: LoginResponse
}

interface LogoutAction {
    type: ActionTypes.LOGOUT
}

export type Action = LoginAction | LogoutAction;