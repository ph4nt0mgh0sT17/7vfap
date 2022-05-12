import {Action} from "../actions";
import {ActionTypes} from "../action-types";
import {LoginResponse} from "../../Models/Responses/LoginResponse";

const initialState: LoginResponse | null = null;

const reducer = (state: LoginResponse | null = initialState, action: Action): LoginResponse | null => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return action.payload;
        case ActionTypes.LOGOUT:
            return null;
        default:
            return state;
    }
}

export default reducer;