// import { UserAction } from "../actions/user.action";
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SignInState,
  SignInAction,
  SIGN_OUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_PROGRESS,
} from '../types/signin.types'

let initialState: SignInState = {
  isLoading: true,
  isSignIn: false,
  isSignOut: true,
  isOpeningApp: true,
  isUpdatingUser: false,
  updateUserSuccess: false,
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
    case UPDATE_USER_PROGRESS:
      return {
        ...state,
        isUpdatingUser: true,
        updateUserSuccess: false,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isUpdatingUser: false,
        updateUserSuccess: true,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isUpdatingUser: false,
        updateUserSuccess: false,
      }
    default:
      return state
  }
}
