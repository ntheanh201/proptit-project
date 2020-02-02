import BaseService from './BaseService'

export interface User {
  className?: string
  dateOfBirth?: string
  description?: string
  displayName?: string
  email?: string
  facebook?: string
  id: string
  password: string
  phoneNumber?: string
  regDate?: Date
  username: string
}

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += '/accounts'
  }
}

export const userService = new UserService()
