import * as Actions from '../action-types'

export const getAllPosts = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.GET_ALL_POSTS,
      payload
    })
}

export const getPostById = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.GET_POST_BY_ID,
      payload
    })
}
