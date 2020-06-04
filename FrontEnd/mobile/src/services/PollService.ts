import React from 'react'
import BaseService from './BaseService'
import { Poll } from '../core/types/tickpoll.types'

class PollService extends BaseService<Poll> {
  constructor() {
    super()
    this.baseURL += 'poll/'
  }
}
