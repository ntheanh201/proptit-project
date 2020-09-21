import {
  SignUpState,
  SIGN_UP_PROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SignInAction,
} from '../types'

let initialState: SignUpState = {
  requesting: false,
  success: false,
}

export default (
  state: SignUpState = initialState,
  action: SignInAction,
): SignUpState => {
  switch (action.type) {
    case SIGN_UP_PROGRESS:
      return {
        ...state,
        requesting: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      }
    case SIGN_UP_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,
      }
    default:
      return state
  }
}
