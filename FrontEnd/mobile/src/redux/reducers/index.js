import {combineReducers} from 'redux'
import SignInReducer from './SignIn';
import DrawerReducer from './Drawer'

export default combineReducers({
  signIn: SignInReducer,
  drawer: DrawerReducer,
});