// import { UserAction } from "../actions/user.action";
import { SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SignInState, SignInAction, SIGN_OUT } from "../types/signin.types";
import { logD } from "../../common/LogTool";

let initialState: SignInState = {
    isLoading: false,
    isSignIn: false,
    isSignOut: true,
}

export default (state: SignInState = initialState, action: SignInAction): SignInState => {
    switch (action.type) {
        case SIGN_IN_PROGRESS:
            return ({
                ...state,
                isLoading: true,
            });
        case SIGN_IN_SUCCESS:
            logD("AppLog", "Reducer: Login Success!")
            return ({
                ...state,
                isLoading: false,
                isSignIn: true,
                currentUserID: action.currentUserID
            });
        case SIGN_IN_ERROR:
            return ({
                ...state,
                isLoading: false,
            });
            case SIGN_OUT:
                return ({
                    ...state,
                    isSignIn: false,
                    isSignOut: true,
                })
        default:
            return state;
    }
}