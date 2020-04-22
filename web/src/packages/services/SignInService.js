import axios from 'axios'
import environments from 'environments'

export const SignInService = (username, password) => {
  return axios
    .post(`${environments.BASE_URL}auth/jwt/create/`, { username, password })
    .then((response) => {
      localStorage.setItem('authToken', JSON.stringify(response.data))
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export const fetchUserDataService = (accessKey) => {
  return axios
    .get(`${environments.BASE_URL}auth/users/me/`, {
      headers: {
        Authorization: `Bearer ${accessKey}`
      }
    })
    .then((response) => {
      localStorage.setItem('userData', JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}
