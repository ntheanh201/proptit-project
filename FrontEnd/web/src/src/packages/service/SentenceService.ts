import axios from 'axios'
import BaseService from './BaseService'

interface Sentence {
  id: number
  name: string
  start_date?: Date
  end_date?: Date
}

class SentenceService extends BaseService<Sentence> {
  constructor() {
    super()
    this.baseURL += '/sentences'
  }

  getBySession(sentenceId: String): Promise<Sentence[]> {
    this.baseURL += `/${sentenceId}`
    return axios
      .get(this.baseURL)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}

export const sentenceService = new SentenceService()
