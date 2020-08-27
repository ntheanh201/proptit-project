import * as Actions from '../action-types'
import {
  GetAllPostsService,
  addPostService,
  updatePostService,
  getPostByIdService,
  deletePostService
} from 'services'

export const getAllPosts = (id = 1, type = 'group') => {
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
  return async dispatch => {
    const response = await addPostService(post, images)
    if (response) {
      dispatch({
        type: Actions.CREATE_POST,
        payload: response
      })
    }
  }
}

export const updatePost = (post, images) => {
  return async dispatch => {
    await updatePostService(post, images)
    dispatch({
      type: Actions.UPDATE_POST,
      payload: post
    })
  }
}

export const deletePost = id => {
  return async dispatch => {
    const response = deletePostService(id)
    dispatch({
      type: Actions.DELETE_POST,
      payload: id
    })
  }
}
