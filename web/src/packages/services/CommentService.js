import axios from 'axios'

import environments from 'environments'
import { convertToCommentArray } from 'helpers'

export const getCommentsByPostIdService = (postId) => {
  return axios
    .get(`${environments.BASE_URL}comments/?post_id=${postId}`)
    .then((response) => {
      return convertToCommentArray(response.data)
    })
    .catch((error) => {
      return null
    })
}

export const addCommentService = (postId, content) => {
  return axios
    .post(`${environments.BASE_URL}comments/`, {
      // eslint-disable-next-line camelcase
      post_id: postId,
      content
    })
    .then((response) => {
      return 'success'
    })
    .catch((error) => {
      return null
    })
}

export const deleteCommentService = (commentId) => {
  return axios
    .delete(`${environments.BASE_URL}comments/${commentId}`)
    .then((response) => {
      return 'success'
    })
    .catch((error) => {
      return null
    })
}
