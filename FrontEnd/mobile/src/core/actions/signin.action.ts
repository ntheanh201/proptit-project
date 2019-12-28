import {Dispatch, Action} from 'redux';
import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from '../types/signin.types';
import { ProUser } from '..';

// export interface UserAction extends Action<String> {
//   user?: ProUser;
// }

export interface SignInAction extends Action<String> {
  user?: ProUser
}

export const signIn = (username: string, password: string) => {
  return (dispatch: Dispatch<SignInAction>) => {
    dispatch({type: SIGN_IN_SUCCESS})
  };
};
