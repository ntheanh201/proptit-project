import { LOADING, GET_ALL_SESSIONS } from '../action-types'

const STATE_INIT = {
  isLoading: false,
  sessions: []
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, ...payload }
    case GET_ALL_SESSIONS:
      return {}
    default:
      return state
  }
}
