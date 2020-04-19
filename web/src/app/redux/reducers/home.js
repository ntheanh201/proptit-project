import * as Actions from '../action-types'

const STATE_INIT = {
  isLoading: false,
  user: {
    id: '1',
    username: 'ngocmai.buiphuong',
    name: 'Bùi Phương Ngọc Mai'
  },
  isLogged: false
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.IS_LOGGED:
      return { ...state, is_logged: payload }
    case Actions.USER_INFO:
      return { ...state, user: payload }
    default:
      return state
  }
}
