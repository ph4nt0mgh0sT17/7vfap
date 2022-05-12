import {Action} from "../actions";
import {ActionTypes} from "../action-types";
import {LoginResponse} from "../../Models/Responses/LoginResponse";

let initialState: LoginResponse | null = null;

let userJsonText = localStorage.getItem('user');
if (userJsonText != null) {
    initialState = JSON.parse(userJsonText) as LoginResponse | null;
}

const reducer = (state: LoginResponse | null = initialState, action: Action): LoginResponse | null => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case ActionTypes.LOGOUT:
            localStorage.removeItem('user');
            return null;
        default:
            return state;
    }
}

export default reducer;