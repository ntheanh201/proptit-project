import axios from 'axios'
import environments from 'environments'
import { getAccessKey, getRefreshToken } from './util'
import { convertToUserType } from '../helpers'

export const SignInService = (username, password) => {
  return axios
    .post(`${environments.BASE_URL}auth/jwt/create/`, { username, password })
    .then((response) => {
      localStorage.setItem('authToken', JSON.stringify(response.data))
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}

export const updateAccessTokenService = () => {
  // get new access token if the current access token is expired
  const refreshToken = getRefreshToken()
  return axios
    .post(`${environments.BASE_URL}auth/jwt/refresh/`, {
      refresh: refreshToken
    })
    .then((response) => {
      const authToken = {
        refresh: refreshToken,
        access: response.data.access
      }
      localStorage.setItem('authToken', JSON.stringify(authToken))
      return response.data
    })
    .catch((error) => {
      return null
    })
}

export const fetchUserDataService = () => {
  const accessKey = getAccessKey()
  return axios
    .get(`${environments.BASE_URL}auth/users/me/`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    .then((response) => {
      const user = convertToUserType(response.data)
      localStorage.setItem('userData', JSON.stringify(user))
      return user
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}
