import {
  SIGN_UP_PROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SignUpAction,
} from '../types'
import { Dispatch } from 'redux'
import { userService } from '../../services'

export const signUp = () => {
  return async (dispatch: Dispatch<SignUpAction>) => {
    dispatch({ type: SIGN_UP_PROGRESS })
    const status = await userService.addNewUser({
      username: 'test1',
      password: 'testpw',
      email: 'test@email',
    })
    if (status === 'success') {
      dispatch({ type: SIGN_UP_SUCCESS })
    } else {
      dispatch({ type: SIGN_UP_ERROR })
    }
  }
}
