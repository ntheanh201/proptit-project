import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './types';

export const signIn = (username, password) => {
  return (action = dispatch => {
    console.log('Sign in!');
    dispatch({type: SIGN_IN_PROGRESS});
    setTimeout(() => {
      username === 'khanh' && password === '1'
        ? dispatch({type: SIGN_IN_SUCCESS})
        : dispatch({type: SIGN_IN_FAIL});
    }, 2000);
  });
};

export const signOut = () => {
  return (action = dispatch => {
    dispatch({type: SIGN_OUT});
  });
};
