import { UserAction, ProUser } from "../actions/user.action";
import { SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT } from "../actions/user.types";

interface UserReducerState {
    isLoading?: boolean;
    user?: ProUser;
}

let initialState: UserReducerState = {
    isLoading: false
}

export default (state: UserReducerState = initialState, action: UserAction): UserReducerState => {
    switch (action.type) {
        case SIGN_IN_PROGRESS:
            return ({
                isLoading: true
            });
        case SIGN_IN_SUCCESS:
            return ({
                isLoading: false,
                user: action.user
            });
        case SIGN_IN_ERROR:
            return ({
                isLoading: false,
            });
        case SIGN_OUT:
            return ({});
        default:
            return state;
    }
}