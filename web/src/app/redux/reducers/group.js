import * as Actions from '../action-types'

const STATE_INIT = {
  groups: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_GROUPS:
      return { ...state, groups: payload }
    default:
      return state
  }
}
