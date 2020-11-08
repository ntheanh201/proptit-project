import BaseService from './BaseService'
import { Post, Reaction, Comment, ImageFormData, Poll, Newsfeed } from '../core'
import Axios from 'axios'

class PostService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += 'posts/'
  }

  getAllwParams(type: 'group' | 'user', id: number): Promise<Newsfeed> {
    const method = type === 'group' ? 'byGroup' : 'byUser'
    return Axios.get(this.baseURL + `?method=${method}&id=${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }

  getFullPostById(postId: number): Promise<Post> {
    return Axios.get(this.baseURL + `${postId}/`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  addPost(
    post: Pick<Post, 'content' | 'assignedGroup' | 'type'>,
    images: ImageFormData[],
    polls: string[],
  ): Promise<Post> {
    const data = new FormData()
    images.forEach((image) => {
      data.append('files', image)
    })
    data.append('group_id', post.assignedGroup.id)
    data.append('type', post.type)
    data.append('content', post.content)
    post.type === 1 && data.append('polls', JSON.stringify(polls))
    return Axios.post(this.baseURL, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }

  updatePost(post: Pick<Post, 'id' | 'content'>): Promise<string> {
    const data = {
      content: post.content,
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
