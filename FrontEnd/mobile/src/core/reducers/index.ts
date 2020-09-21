import signinReducer from './signin.reducer'
import postsReducer from './post.reducer'
import groupReducer from './group.reducer'
import { combineReducers } from 'redux'
import { SignInState } from '../types/signin.types'
import { PostsState } from '../types/post.types'
import { GroupState } from '../types/group.types'
import { SignUpState } from '../types'
import signupReducer from './signup.reducer'

export interface AppState {
  signin: SignInState
  signup: SignUpState
  post: PostsState
  group: GroupState
}

export const rootReducer = combineReducers<AppState>({
  signin: signinReducer,
  post: postsReducer,
  group: groupReducer,
  signup: signupReducer,
})
