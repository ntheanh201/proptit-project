import BaseService from './BaseService'
import { Newsfeed, Post } from '../core'
import Axios from 'axios'
import { Alert } from 'react-native'

class NewsfeedService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += 'newsfeed/'
  }

  getPagingNewsfeed(link?: string): Promise<Newsfeed> {
    return Axios.get(link ?? this.baseURL)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }
}

export const newsfeedService = new NewsfeedService()
