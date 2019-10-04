import {SIGN_IN_FAIL, SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_OUT} from '../actions/types'

const initialState = {

}

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGN_IN_PROGRESS: {
      // console.log('Progress!');
      return {
        isLoading: true,
      }
    }
    case SIGN_IN_SUCCESS: {
      // console.log('Success!');
      return {
        isLoading: false,
        isSuccess: true,
      }
    }
    case SIGN_IN_FAIL: {
      // console.log('Fail!');
      return {
        isLoading: false,
        isSuccess: false,
      }
    }
    case SIGN_OUT: {
      return {
        isLogout: true,
      }
    }
    default: {
      return {

      }
    }
  }
}