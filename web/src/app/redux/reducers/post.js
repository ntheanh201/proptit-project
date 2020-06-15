/* eslint-disable camelcase */
import * as Actions from '../action-types'

const STATE_INIT = {
  posts: [],
  post: null,
  comments: null,
  reactions: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_POSTS:
      return { ...state, posts: payload }
    case Actions.GET_POST_BY_ID:
      return {
        ...state,
        post: payload.post,
        comments: payload?.commentsInfo,
        reactions: payload?.reactionsInfo
      }
    case Actions.GET_POSTS_BY_GROUP:
      return { ...state, posts: payload }
    case Actions.CREATE_POST:
      return { ...state, posts: [payload, ...state.posts] }
    case Actions.UPDATE_POST:
      const postIndex = state.posts.findIndex(({ id }) => id === payload.id)
      let posts = state.posts
      posts[postIndex] = payload
      return { ...state, posts }
    case Actions.DELETE_POST:
      return { ...state, posts: state.posts.filter(({ id }) => id !== payload) }
    default:
      return state
  }
}
