import { Action } from 'redux'
import { User } from './user.types'

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS'
export const SIGN_OUT = 'SIGN_OUT'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
export const UPDATE_USER_PROGRESS = 'UPDATE_USER_PROGRESS'

export interface SignInState {
  isOpeningApp: boolean
  isLoading: boolean
  isSignIn: boolean
  isSignOut: boolean
  isUpdatingUser: boolean
  updateUserSuccess: boolean
  authToken?: AuthToken
  currentUser?: User
}

export interface AuthToken {
  refresh: string
  access: string
}

export interface SignInAction extends Action<string> {
  authKey?: AuthToken
  currentUser?: User
}
