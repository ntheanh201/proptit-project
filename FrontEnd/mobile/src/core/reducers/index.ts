import signinReducer from './signin.reducer'
import newfeedReducer from './newfeed.reducer'
import groupReducer from './group.reducer'
import { combineReducers } from 'redux'
import { SignInState } from '../types/signin.types'
import { NewsfeedState } from '../types/newfeed.types'
import { GroupState } from '../types/group.types'

export interface AppState {
  signin: SignInState
  newfeed: NewsfeedState
  group: GroupState
}

export const rootReducer = combineReducers<AppState>({
  signin: signinReducer,
  newfeed: newfeedReducer,
  group: groupReducer,
})
