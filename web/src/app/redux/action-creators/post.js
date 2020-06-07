import * as Actions from '../action-types'
import {
  GetAllPostsService,
  addPostService,
  updatePostService,
  getPostByIdService
} from 'services'

export const getAllPosts = (type = 'group', id = 1) => {
  return async dispatch => {
    // eslint-disable-next-line new-cap
    const payload = await GetAllPostsService(type, id)
    dispatch({
      type: Actions.GET_ALL_POSTS,
      payload
    })
  }
}

export const getPostById = id => {
  return async dispatch => {
    const payload = await getPostByIdService(id)
    dispatch({
      type: Actions.GET_POST_BY_ID,
      payload
    })
  }
}

export const createPost = (post, images) => {
  return dispatch => {
    const response = addPostService(post, images)
    if (response === 'success') {
      dispatch({
        type: Actions.CREATE_POST,
        payload: post
      })
      return 'success'
    }
    return 'error'
  }
}

export const updatePost = (post, images) => {
  return dispatch => {
    const post = updatePostService(post, images)
    dispatch({
      type: Actions.UPDATE_POST,
      payload: post
    })
  }
}
