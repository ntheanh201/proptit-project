import * as Actions from '../action-types'
import { GetAllPostsService } from 'services'

export const getAllPosts = () => {
  return async (dispatch) => {
    // eslint-disable-next-line new-cap
    const payload = await GetAllPostsService()
    dispatch({
      type: Actions.GET_ALL_POSTS,
      payload
    })
  }
}

export const getPostById = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.GET_POST_BY_ID,
      payload
    })
}

export const getPostsByGroupId = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.GET_POSTS_BY_GROUP,
      payload
    })
}

export const createPost = (payload) => {
  return (dispatch) =>
    dispatch({
      type: Actions.CREATE_POST,
      payload
    })
}
