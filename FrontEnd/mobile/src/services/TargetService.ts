import Axios from 'axios'
import { Alert } from 'react-native'
import { Target } from '../core'
import BaseService from './BaseService'

class TargetService extends BaseService<Target> {
  constructor() {
    super()
    this.baseURL += 'target/'
  }
  getCurrentMonthTarget(): Promise<Target[]> {
    return Axios.get(this.baseURL + '?method=currentMonth')
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }
}

export const targetService = new TargetService()
