import BaseService from './BaseService'
import { User, SignUpData } from '../core'
import Axios from 'axios'
import { BASE_URL } from '../values/env'
import { Alert } from 'react-native'

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'auth/users/'
  }

  addNewUser(data: SignUpData): Promise<string> {
    return Axios.post(BASE_URL + 'users/create/', data)
      .then((res) => {
        if (res.data.error) {
          return res.data.error
        }
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
        return err
      })
  }
}

export const userService = new UserService()
