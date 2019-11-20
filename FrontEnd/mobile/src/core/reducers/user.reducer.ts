import { UserAction } from "../actions/user.action";
import { SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT } from "../types/user.types";
import { UserState } from "../types/user.types";

let initialState: UserState = {
    isLoading: false,
}

export default (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case SIGN_IN_PROGRESS:
            console.log("AppLog", "Progress!")
            return ({
                isLoading: true
            });
        case SIGN_IN_SUCCESS:
            console.log("AppLog", "Success!")
            return ({
                isLoading: false,
                user: action.user
            });
        case SIGN_IN_ERROR:
            console.log("AppLog", "Error!")
            return ({
                isLoading: false,
            });
        case SIGN_OUT:
            console.log("AppLog", "Out!")
            return ({});
        default:
            console.log("AppLog", "Default!")
            return state;
    }
}