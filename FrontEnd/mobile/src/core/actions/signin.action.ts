import { User } from './../types/user.types'
import { Dispatch } from 'redux'
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SignInAction,
} from '../types/signin.types'
import { signInService } from '../../services'
import AsyncStorage from '@react-native-community/async-storage'

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<SignInAction>) => {
    dispatch({ type: SIGN_IN_PROGRESS })
    const authToken = await signInService.requestSignIn(username, password)
    const userData = await signInService.getUserAfterAuth(authToken.access)
    if (userData && authToken) {
      dispatch({ type: SIGN_IN_SUCCESS, currentUser: userData, authToken })
    } else {
      dispatch({ type: SIGN_IN_ERROR })
    }
  }
}

export const autoSignIn = () => {
  return async (dispatch: Dispatch<SignInAction>) => {
    const tokenStr = await AsyncStorage.getItem('authToken')
    if (tokenStr) {
      const refreshToken = JSON.parse(tokenStr).refresh
      const authToken = await signInService.refreshToken(refreshToken)
      if (authToken) {
        const userDataStr = await AsyncStorage.getItem('userData')
        const userData: User = userDataStr && JSON.parse(userDataStr)
        dispatch({ type: SIGN_IN_SUCCESS, currentUser: userData, authToken })
      } else {
        dispatch({ type: SIGN_IN_ERROR })
      }
    } else {
      dispatch({ type: SIGN_IN_ERROR })
    }
  }
}

export const signOut = (): SignInAction => {
  return { type: SIGN_OUT }
}
