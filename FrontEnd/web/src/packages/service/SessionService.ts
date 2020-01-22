import axios from 'axios'
import BaseService from './BaseService'

interface Session {
  id: number
  name: string
  start_date?: Date
  end_date?: Date
}

class SessionService extends BaseService<Session> {
  constructor() {
    super()
    this.baseURL += '/sessions'
  }

  getBySession(sessionId: String): Promise<Session[]> {
    this.baseURL += `/${sessionId}`
    return axios
      .get(this.baseURL)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}

export const sessionService = new SessionService()
