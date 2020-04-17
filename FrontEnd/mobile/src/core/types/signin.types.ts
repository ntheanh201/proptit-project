import { Action } from 'redux'
import { User } from './user.types'

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS'
export const SIGN_OUT = 'SIGN_OUT'

export interface SignInState {
  isOpeningApp: boolean
  isLoading: boolean
  isSignIn: boolean
  isSignOut: boolean
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
