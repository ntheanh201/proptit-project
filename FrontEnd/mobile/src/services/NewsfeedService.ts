import BaseService from './BaseService'
import { Post } from '../core'

class NewsfeedService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += 'newsfeed/'
  }
}

export const newfeedService = new NewsfeedService()
