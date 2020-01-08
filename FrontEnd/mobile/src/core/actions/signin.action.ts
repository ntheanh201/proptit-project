import { Dispatch } from 'redux';
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SignInAction,
} from '../types/signin.types';
import { signInService } from '../../service';
import AsyncStorage from '@react-native-community/async-storage';

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<SignInAction>) => {
    dispatch({ type: SIGN_IN_PROGRESS });
    const userId = await signInService.requestSignIn(username, password);
    if (userId) {
      dispatch({ type: SIGN_IN_SUCCESS, currentUserID: userId });
    } else {
      dispatch({ type: SIGN_IN_ERROR });
    }
  };
};

export const handleContinueSignIn = () => {
  return async (dispatch: Dispatch<SignInAction>) => {
    dispatch({ type: SIGN_IN_PROGRESS });
    const isContinue = await signInService.checkLogin();
    if (isContinue) {
      const userId = await AsyncStorage.getItem('userId');
      dispatch({ type: SIGN_IN_SUCCESS, currentUserID: userId! });
    } else {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (username && password) {
        const userId = await signInService.requestSignIn(username, password);
        dispatch({ type: SIGN_IN_SUCCESS, currentUserID: userId });
      } else {
        dispatch({ type: SIGN_IN_ERROR });
      }
    }
  };
};

export const signOut = (): SignInAction => {
  return { type: SIGN_OUT };
};
