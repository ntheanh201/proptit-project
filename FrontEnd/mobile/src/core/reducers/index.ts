import signinReducer from './signin.reducer';
import homeReducer from './newfeed.reducer';
import groupReducer from './group.reducer';
import {combineReducers} from 'redux';
import {SignInState} from '../types/signin.types';
import { NewFeedState } from '../types/newfeed.types';
import { GroupState } from '../types/group.types';

export interface AppState {
  signin: SignInState;
  newfeed: NewFeedState;
  group: GroupState;
}

export const rootReducer = combineReducers<AppState>({
  signin: signinReducer,
  newfeed: homeReducer,
  group: groupReducer
});
