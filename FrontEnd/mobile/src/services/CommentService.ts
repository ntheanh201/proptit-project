import React from 'react'
import BaseService from './BaseService'
import { Comment } from '../core'
import Axios from 'axios'

class CommentService extends BaseService<Comment> {
  constructor() {
    super()
    this.baseURL += 'comments/'
  }

  getByPostId(postId: number): Promise<Comment[]> {
    return Axios.get(this.baseURL + `?post_id=${postId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        return []
      })
  }

  addComment(postId: number, content: string): Promise<string> {
    const data = { assignedPost: postId, content: content }
    return Axios.post(this.baseURL, data)
      .then((res) => {
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }

  updateComment(content: string, id: number): Promise<string> {
    return Axios.patch(this.baseURL + `${id}/`, {
      content,
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
}

export const commentService = new CommentService()
