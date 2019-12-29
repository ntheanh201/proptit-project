import {Dispatch} from 'redux';
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SignInAction,
} from '../types/signin.types';
import { UserManager } from '../types/user';

export const signIn = (username: string, password: string) => {
  return (dispatch: Dispatch<SignInAction>) => {
    UserManager.getInstance().signIn(username, password)
    dispatch({type: SIGN_IN_SUCCESS})
  };
};
