import Axios from 'axios'

export default class BaseService<T> {
  protected baseURL = ''

  constructor() {
    this.baseURL = 'http://apis.aiforce.xyz/'
  }

  getAll(): Promise<T[]> {
    return Axios.get(this.baseURL)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  getById(id: number): Promise<T> {
    return Axios.get(this.baseURL + `${id}/`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  add(item: T): Promise<string> {
    return Axios.post(this.baseURL, item)
      .then((res) => {
        console.log(res.status)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }

  update(item: T): Promise<string> {
    return Axios.patch(this.baseURL, item)
      .then((res) => {
        console.log(res.status)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }

  delete(id: number): Promise<string> {
    return Axios.delete(this.baseURL + `${id}/`)
      .then((res) => {
        console.log(res.status)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'error'
      })
  }
}
