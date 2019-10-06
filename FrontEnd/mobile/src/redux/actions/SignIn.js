import {
  SIGN_IN_PROGRESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './types';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('AppLog-err', error);
  }
};

export const signInWithEmailAndPassword = (username, password) => {
  return (action = dispatch => {
    console.log('Sign in!');
    dispatch({type: SIGN_IN_PROGRESS});
    axios({
      method: 'post',
      url: 'http://192.168.128.206:8080/proptit/login',
      data: {
        username,
        password,
      },
    })
      .catch(err => {
        dispatch({type: SIGN_IN_FAIL});
      })
      .then(res => {
        if (res.status === 200) {
          //save token
          _storeData('token', res.data.token);
          dispatch({type: SIGN_IN_SUCCESS});
        } else {
          dispatch({type: SIGN_IN_FAIL});
        }
      });
  });
};

export const signInWithToken = token => {
  return (action = dispatch => {
    console.log('Sign in!');
    dispatch({type: SIGN_IN_PROGRESS});
    axios({
      method: 'get',
      url: 'http://192.168.128.206:8080/proptit/',
      headers: {
        Authorization: token,
      },
    })
      .catch(err => {
        dispatch({type: SIGN_IN_FAIL});
      })
      .then(res => {
        if (res.status === 200) {
          //save token
          dispatch({type: SIGN_IN_SUCCESS});
        } else {
          dispatch({type: SIGN_IN_FAIL});
        }
      });
  });
};

export const signOut = () => {
  console.log('Sign out!');
  return (action = dispatch => {
    dispatch({type: SIGN_OUT});
  });
};
