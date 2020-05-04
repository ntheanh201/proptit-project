import React from 'react'
import BaseService from './BaseService'
import { Reaction } from '../core'
import Axios from 'axios'

class ReactionService extends BaseService<Reaction> {
  constructor() {
    super()
    this.baseURL += 'reactions/'
  }

  addReaction(postId: number): Promise<number> {
    return Axios.post(this.baseURL, { post_id: postId })
      .then((res) => {
        return res.data.reaction_id
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }
}

export const reactionService = new ReactionService()
