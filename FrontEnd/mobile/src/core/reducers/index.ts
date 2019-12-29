import signinReducer from './signin.reducer';
import homeReducer from './home.reducer';
import {combineReducers} from 'redux';
import {SignInState} from '../types/signin.types';
import { HomeState } from '../types/home.types';

export interface AppState {
  signin: SignInState;
  home: HomeState;
}

export const rootReducer = combineReducers<AppState>({
  signin: signinReducer,
  home: homeReducer
});
