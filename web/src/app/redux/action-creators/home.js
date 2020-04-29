import * as Actions from '../action-types'

import {
  SignInService,
  fetchUserDataService,
  updateAccessTokenService
} from 'services'

// export const

export const updatePreloader = () => {
  return async (dispatch) => {
    // check if current refresh token is active or not, if it's not active (return null), user need to login again
    const updateToken = await updateAccessTokenService()
    let isLogged = false
    if (updateToken) {
      if (
        localStorage &&
        localStorage.getItem('authToken') &&
        localStorage.getItem('userData')
      ) {
        // const authToken = JSON.parse(localStorage.getItem('authToken'))
        const userInfo = JSON.parse(localStorage.getItem('userData'))
        isLogged = true
        dispatch({
          type: Actions.USER_INFO,
          payload: userInfo
        })
      }
    }
    dispatch({
      type: Actions.IS_LOGGED,
      payload: isLogged
    })
  }
}

export const updateLogin = (payload) => {
  return async (dispatch) => {
    // eslint-disable-next-line new-cap
    const authCredential = await SignInService(
      payload.username,
      payload.password
    )
    if (authCredential !== 401) {
      const userInfo = await fetchUserDataService()
      const isLogged = !!userInfo
      dispatch({
        type: Actions.IS_LOGGED,
        payload: isLogged
      })
    } else {
      return 401
    }
  }
}

export const updateLoginStatus = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.IS_LOGGED,
      payload
    })
}

export const updateUserInfo = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.USER_INFO,
      payload
    })
}
