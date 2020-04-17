import { Action } from 'redux'
import { User } from './user.types'

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_IN_PROGRESS = 'SIGN_IN_PROGRESS'
export const SIGN_OUT = 'SIGN_OUT'

export interface SignInState {
  isLoading: boolean
  isSignIn: boolean
  isSignOut: boolean
  authKey?: AuthKey
  currentUser?: User
}

export interface AuthKey {
  refresh: string
  access: string
}

export interface SignInAction extends Action<string> {
  authKey?: AuthKey
  currentUser?: User
}
