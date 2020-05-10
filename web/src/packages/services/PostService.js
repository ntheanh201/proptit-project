import axios from 'axios'
import environments from 'environments'
import { convertToPostArray } from 'helpers'

import { getAccessKey } from './util'

export const GetAllPostsService = (type, id) => {
  const accessKey = getAccessKey()
  const method = type === 'group' ? 'byGroup' : 'byUser'
  return axios
    .get(`${environments.BASE_URL}posts/?method=${method}&id=${id}`)
    .then((response) => {
      return convertToPostArray(response.data)
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const getPostByIdService = (postId) => {
  const accessKey = getAccessKey()
  return axios
    .get(`${environments.BASE_URL}posts/${postId}/`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
  // todo: return post, reactions_info, comments_info
}

export const addPostService = (post, images) => {
  const data = new FormData()
  images.forEach((image) => {
    data.append('files', image)
  })
  data.append('group_id', post.groupId)
  data.append('type', post.type)
  data.append('content', post.content)
  return axios
    .post(`${environments.BASE_URL}posts/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      console.log(res.data)
      return 'success'
    })
    .catch((err) => {
      return 'error'
    })
}

export const updatePostService = (post, images) => {
  const data = new FormData()
  images.forEach((image) => {
    data.append('files', image)
  })
  data.append('group_id', post.groupId)
  data.append('type', post.type)
  data.append('content', post.content)
  return axios
    .patch(`${environments.BASE_URL}posts/${post.id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      console.log(res.data)
      return 'success'
    })
    .catch((err) => {
      return 'error'
    })
}

export const deletePostService = (post) => {
  return axios
      .delete(`${environments.BASE_URL}posts/${post.id}/`)
      .then((res) => {
        console.log(res.data)
        return 'success'
      })
      .catch((err) => {
        return 'error'
      })
}
