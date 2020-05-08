import BaseService from './BaseService'
import { User } from '../core'

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'auth/users/me/'
  }
}

export const userService = new UserService()
