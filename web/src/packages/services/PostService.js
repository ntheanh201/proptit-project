/* eslint-disable camelcase */

import axios from 'axios'
import environments from 'environments'
import { convertToPostArray, convertPostType } from 'helpers'

export const GetAllPostsService = (type, id) => {
  const method = type === 'group' ? 'byGroup' : 'byUser'
  return axios
    .get(`${environments.BASE_URL}posts/?method=${method}&id=${id}`)
    .then(response => {
      return convertToPostArray(response.data)
    })
    .catch(error => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const getPostByIdService = postId => {
  return axios
    .get(`${environments.BASE_URL}posts/${postId}/`)
    .then(response => {
      const { post, reactions_info, comments_info } = response.data

      return {
        post: { ...convertPostType(post), isLiked: post.is_liked },
        reactionsInfo: reactions_info,
        commentsInfo: comments_info
      }
    })
    .catch(error => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const addPostService = (post, images) => {
  const data = new FormData()
  images &&
    images.map(image => {
      data.append('files', image)
    })
  data.append('group_id', post.groupId)
  data.append('type', post.type)
  data.append('content', post.content)
  return axios
    .post(`${environments.BASE_URL}posts/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      console.log(res.data)
      return 'success'
    })
    .catch(err => {
      return null
    })
}

export const updatePostService = (post, images) => {
  const data = new FormData()
  images.forEach(image => {
    data.append('files', image)
  })
  data.append('group_id', post.groupId)
  data.append('type', post.type)
  data.append('content', post.content)
  return axios
    .patch(`${environments.BASE_URL}posts/${post.id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      console.log(res.data)
      return 'success'
    })
    .catch(err => {
      return null
    })
}

export const deletePostService = postId => {
  return axios
    .delete(`${environments.BASE_URL}posts/${postId}/`)
    .then(res => {
      console.log(res.data)
      return 'success'
    })
    .catch(err => {
      return null
    })
}
