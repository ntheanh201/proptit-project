import axios from 'axios'

import environments from 'environments'

export default class BaseService<T> {
  protected baseURL = environments.baseUrl

  constructor() {}

  getAll(): Promise<T[]> {
    return axios
      .get(this.baseURL)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }

  getById(id: String): Promise<T> {
    return axios
      .get(this.baseURL + `/${id}`)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}
