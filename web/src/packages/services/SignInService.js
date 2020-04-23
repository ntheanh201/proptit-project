import axios from 'axios'
import environments from 'environments'
import { getAccessKey } from './util'

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
  // todo: get new access token if the current access token is expired
  return null
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
      localStorage.setItem('userData', JSON.stringify(response.data))
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return error.response.status
      }
      return null
    })
}
