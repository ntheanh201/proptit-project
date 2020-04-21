import BaseService from './BaseService'
import { Post, Reaction, Comment } from '../core'
import Axios from 'axios'

class PostService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += 'posts/'
  }

  getByGroup(groupId: number): Promise<Post[]> {
    return Axios.get(this.baseURL + `/${groupId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  getFullPostById(
    postId: number,
  ): Promise<{
    post: Post
    reactions_info: Reaction[]
    comments_info: Comment[]
  }> {
    return Axios.get(this.baseURL + `${postId}/`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
}

export const postService = new PostService()
