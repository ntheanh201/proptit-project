/* eslint-disable camelcase */
import * as Actions from '../action-types'

const STATE_INIT = {
  reactionId: null,
  message: null,
  errorMessage: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.ADD_REACTION_SUCCESS:
      return { ...state, reactionId: payload }
    case Actions.ADD_REACTION_FAIL:
      return { ...state, errorMessage: payload }
    case Actions.REMOVE_REACTION_SUCCESS:
      return { ...state, message: payload }
    case Actions.REMOVE_REACTION_FAIL:
      return { ...state, errorMessage: payload }
    default:
      return state
  }
}
