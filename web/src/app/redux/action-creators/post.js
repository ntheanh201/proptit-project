import * as Actions from '../action-types'
import {
  GetAllPostsService,
  addPostService,
  updatePostService,
  getPostByIdService
} from 'services'
import { convertToServerPostType } from 'helpers'

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
  return async dispatch => {
    const convertedPost = convertToServerPostType(post)
    const response = await addPostService(convertedPost, images)
    if (response) {
      dispatch({
        type: Actions.CREATE_POST,
        payload: convertPostType(response)
      })
    }
  }
}

export const updatePost = (post, images) => {
  return async dispatch => {
    const post = await updatePostService(post, images)
    dispatch({
      type: Actions.UPDATE_POST,
      payload: post
    })
  }
}
