import {
  SIGN_UP_PROGRESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SignUpAction,
  SignUpData,
} from '../types'
import { Dispatch } from 'redux'
import { userService } from '../../services'
import { Alert } from 'react-native'

export const signUp = (data: SignUpData) => {
  return async (dispatch: Dispatch<SignUpAction>) => {
    dispatch({ type: SIGN_UP_PROGRESS })
    const response = await userService.addNewUser(data)
    if (response === 'success') {
      dispatch({ type: SIGN_UP_SUCCESS })
    } else {
      Alert.alert('Error', response)
      dispatch({ type: SIGN_UP_ERROR })
    }
  }
}
