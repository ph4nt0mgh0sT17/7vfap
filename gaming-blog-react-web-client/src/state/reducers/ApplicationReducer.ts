import {Action} from "../actions";
import {ActionTypes} from "../action-types";
import {LoginResponse} from "../../Models/Responses/LoginResponse";

const retrieveLoggedUser = (): LoginResponse | null => {
    let userJsonText = localStorage.getItem('user');
    if (userJsonText != null) {
        return JSON.parse(userJsonText) as LoginResponse | null;
    }

    return null;
};

let initialState = retrieveLoggedUser();

const ApplicationReducer = (state: LoginResponse | null = initialState, action: Action): LoginResponse | null => {
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

export default ApplicationReducer;