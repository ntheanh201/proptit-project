/* eslint-disable camelcase */
import * as Actions from '../action-types'

const STATE_INIT = {
  posts: [],
  post: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_POSTS:
      return { ...state, posts: payload }
    case Actions.GET_POST_BY_ID:
      return { ...state, post: payload.post }
    case Actions.GET_POSTS_BY_GROUP:
      return { ...state, posts: payload }
    case Actions.CREATE_POST:
      return { ...state, posts: [payload, ...state.posts] }
    case Actions.UPDATE_POST:
      return { ...state, posts: payload }
    case Actions.DELETE_POST:
      return { ...state, posts: state.posts.filter(({ id }) => id !== payload) }
    default:
      return state
  }
}
