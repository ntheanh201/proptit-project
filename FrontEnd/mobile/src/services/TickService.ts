import BaseService from './BaseService'
import { Tick } from '../core'
import { resolvePlugin } from '@babel/core'
import Axios from 'axios'

class TickService extends BaseService<Tick> {
  constructor() {
    super()
    this.baseURL += 'ticks/'
  }

  addTick(pollId: number): Promise<Tick> {
    return Axios.post(this.baseURL, { assignedPoll: pollId })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const tickService = new TickService()
