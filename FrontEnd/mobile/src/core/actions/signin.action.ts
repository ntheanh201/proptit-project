import {Dispatch} from 'redux';
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SignInAction,
} from '../types/signin.types';

export const signIn = (username: string, password: string) => {
  return (dispatch: Dispatch<SignInAction>) => {
    dispatch({type: SIGN_IN_SUCCESS})
  };
};

export const signOut = (): SignInAction => {
  return ({type: SIGN_OUT})
}