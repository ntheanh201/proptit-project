import * as Actions from '../action-types'

const STATE_INIT = {
  posts: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_POSTS:
      return { ...state, posts: payload }
    case Actions.GET_POST_BY_ID:
      return { ...state, posts: payload }
    case Actions.CREATE_POST:
      return { ...state, posts: payload }
    case Actions.UPDATE_POST:
      return { ...state, posts: payload }
    case Actions.DELETE_POST:
      return { ...state, posts: payload }
    default:
      return state
  }
}
