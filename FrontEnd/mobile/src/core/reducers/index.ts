import  userReducer from "./user.reducer";
import { combineReducers } from "redux";
import { UserState } from "../types/user.types";

export interface AppState {
    user: UserState
}

export const rootReducer = combineReducers({
    user: userReducer
})