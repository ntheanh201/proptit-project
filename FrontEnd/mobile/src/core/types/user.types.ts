export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS';

export interface ProUser {
  className: string;
  dateOfBirth: string;
  description: string;
  displayName: string;
  email: string;
  facebook: string;
  id: string;
  password: string;
  phoneNumber: string;
  regDate: string;
  username: string;
}

export interface UserState {
  isLoading?: boolean;
  user?: ProUser;
}

interface SignInAction {
  type: string;
  user?: ProUser;
}

export type UserActionTypes = SignInAction;
