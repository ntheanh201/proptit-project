import BaseService from './BaseService'
import { User, ImageFormData } from '../core'
import Axios from 'axios'

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'auth/users/me/'
  }

  updateAvatar(formData: ImageFormData): Promise<User> {
    const data = new FormData()
    data.append('avatar', formData)
    return Axios.patch(this.baseURL, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }
}

export const userService = new UserService()
