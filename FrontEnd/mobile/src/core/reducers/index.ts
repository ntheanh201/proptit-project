import signinReducer from './signin.reducer';
import {combineReducers} from 'redux';
import {SignInState} from '../types/signin.types';

export interface AppState {
  signin: SignInState;
}

export const rootReducer = combineReducers<AppState>({
  signin: signinReducer,
});
