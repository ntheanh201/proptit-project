import * as Actions from '../action-types'

const STATE_INIT = {
  user: null,
  isLogged: false
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.IS_LOGGED:
      return { ...state, isLogged: payload }
    case Actions.USER_INFO:
      return { ...state, user: payload }
    default:
      return state
  }
}
