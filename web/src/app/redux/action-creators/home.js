import * as Actions from '../action-types'

export const updateLoginStatus = payload => {
  return dispatch =>
    dispatch({
      type: Actions.IS_LOGGED,
      payload
    })
}

export const updateUserInfo = payload => {
  return dispatch =>
    dispatch({
      type: Actions.USER_INFO,
      payload
    })
}
