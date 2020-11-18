import React from 'react'
import BaseService from './BaseService'
import { MiniUser, Reaction } from '../core'
import Axios from 'axios'
import { Alert } from 'react-native'

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
        Alert.alert('Check your Internet Connection!')
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
        Alert.alert('Check your Internet Connection!')
      })
  }
}

export const reactionService = new ReactionService()
