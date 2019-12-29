import { Action } from "redux";

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS';

export interface SignInState {
  isLoading: boolean
  isSuccess: boolean
  currentUserID?: string
}

export interface SignInAction extends Action<String> {
  currentUserID?: string
}
