import Axios from 'axios'
import { Alert } from 'react-native'
import { Rank } from '../core'
import BaseService from './BaseService'

class RankService extends BaseService<Rank> {
  constructor() {
    super()
    this.baseURL += 'rank/'
  }

  getRankwParams(): Promise<Rank[]> {
    return Axios.get(this.baseURL + '?method=allTime')
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }
}

export const rankService = new RankService()
