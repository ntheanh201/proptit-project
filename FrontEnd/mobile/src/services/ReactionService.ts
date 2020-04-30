import React from 'react'
import BaseService from './BaseService'
import { Reaction } from '../core'

class ReactionService extends BaseService<Reaction> {
  constructor() {
    super()
    this.baseURL += 'reactions/'
  }
}

export const reactionService = new ReactionService()
