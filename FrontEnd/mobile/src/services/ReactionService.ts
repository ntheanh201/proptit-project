import React from 'react'
import BaseService from './BaseService'
import { MiniUser, Reaction } from '../core'
import Axios from 'axios'

class ReactionService extends BaseService<Reaction> {
  constructor() {
    super()
    this.baseURL += 'reactions/'
  }

  addReaction(postId: number): Promise<number> {
    return Axios.post(this.baseURL, { assignedPost: postId, type: 0 })
      .then((res) => {
        return res.data.id
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }

  getReactionByPost(postId: number): Promise<Reaction[]> {
    return Axios.get(this.baseURL + `?postId=${postId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const reactionService = new ReactionService()
