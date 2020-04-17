// import { UserAction } from "../actions/user.action";
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SignInState,
  SignInAction,
  SIGN_OUT,
} from '../types/signin.types'

let initialState: SignInState = {
  isLoading: true,
  isSignIn: false,
  isSignOut: true,
  isOpeningApp: true,
}

export default (
  state: SignInState = initialState,
  action: SignInAction,
): SignInState => {
  switch (action.type) {
    case SIGN_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignIn: true,
        currentUser: action.currentUser,
        authToken: action.authKey,
        isOpeningApp: false,
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        isLoading: false,
        isOpeningApp: false,
      }
    case SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        isSignOut: true,
      }
    default:
      return state
  }
}
