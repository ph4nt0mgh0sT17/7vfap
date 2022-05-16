import {combineReducers} from "redux";
import ApplicationReducer from "./ApplicationReducer";

const reducers = combineReducers({
    application: ApplicationReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;