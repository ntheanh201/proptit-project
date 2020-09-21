import { Action } from 'redux'

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const SIGN_UP_PROGRESS = 'SIGN_UP_PROGRESS'

export interface SignUpState {
  requesting: boolean
  success: boolean
}

export interface SignUpData {
  username: string
  password: string
  email: string
}

export interface SignUpAction extends Action<string> {}
