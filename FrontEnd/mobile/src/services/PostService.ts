import BaseService from './BaseService'
import { Post, Reaction, Comment, ImageFormData } from '../core'
import Axios from 'axios'

class PostService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += 'posts/'
  }

  getAllwParams(type: 'group' | 'user', id: number): Promise<Post[]> {
    const method = type === 'group' ? 'byGroup' : 'byUser'
    return Axios.get(this.baseURL + `?method=${method}&id=${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        return null
      })
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

  addPost(post: Post, images: ImageFormData[]): Promise<string> {
    const data = new FormData()
    images.forEach((image) => {
      data.append('files', image)
    })
    data.append('group_id', post.groupId)
    data.append('type', post.type)
    data.append('content', post.content)
    return Axios.post(this.baseURL, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res.data)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }

  updatePost(post: Post): Promise<string> {
    const data = {
      group_id: post.groupId,
      content: post.content,
      type: post.type,
    }
    return Axios.patch(this.baseURL + `${post.id}/`, data)
      .then((res) => {
        console.log(res.data)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }
}

export const postService = new PostService()
