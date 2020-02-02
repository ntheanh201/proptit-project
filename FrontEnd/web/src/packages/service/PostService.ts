import BaseService from './BaseService'
import axios from 'axios'

export interface Post {
  id: string
  userId: string
  groupId: string
  content: string
  time: Date
  type: Number
}

class PostService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += '/posts'
  }

  getByGroup(groupId: string): Promise<Post[]> {
    return axios
      .get(this.baseURL + `/${groupId}`)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}

export const postService = new PostService()
