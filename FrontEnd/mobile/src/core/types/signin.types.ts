import { Action } from 'redux';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS';
export const SIGN_OUT = 'SIGN_OUT';

export interface SignInState {
  isLoading: boolean;
  isSignIn: boolean;
  isSignOut: boolean;
  currentUserID?: string;
}

export interface SignInAction extends Action<string> {
  currentUserID?: string;
}
