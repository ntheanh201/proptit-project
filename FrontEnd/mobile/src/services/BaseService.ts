import axios from 'axios'

export default class BaseService<T> {
  protected baseURL = ''

  constructor() {
    this.baseURL = 'http://apis.aiforce.xyz/'
  }

  getAll(): Promise<T[]> {
    return axios
      .get(this.baseURL)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  getById(id: string): Promise<T> {
    return axios
      .get(this.baseURL + `/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  add(item: T): Promise<void> {
    return axios
      .post(this.baseURL, item)
      .then((res) => {
        console.log(res.status)
        return
      })
      .catch((err) => console.log(err))
  }

  update(item: T): Promise<void> {
    return axios
      .patch(this.baseURL, item)
      .then((res) => {
        console.log(res.status)
        return
      })
      .catch((err) => console.log(err))
  }

  delete(id: string): Promise<void> {
    return axios
      .delete(this.baseURL + `/${id}`)
      .then((res) => {
        console.log(res.status)
        return
      })
      .catch((err) => console.log(err))
  }
}
