import axios from 'axios'
import environments from 'environments'
import { getAccessKey } from './util'

export const GetAllPostsService = () => {
  const accessKey = getAccessKey()
  return axios
    .get(`${environments.BASE_URL}posts/`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const getPostsByGroupIdService = (id) => {
  const accessKey = getAccessKey()
  return axios
    .get(`${environments.BASE_URL}posts/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const getPostByIdService = (id) => {
  const accessKey = getAccessKey()
  return axios
    .get(`${environments.BASE_URL}posts/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}
