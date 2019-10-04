import {combineReducers} from 'redux'
import SignInReducer from './SignIn';

export default combineReducers({
  signIn: SignInReducer,
});