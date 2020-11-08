import Axios from 'axios'
import { Alert } from 'react-native'
import { BASE_URL } from '../values/env'

export default class BaseService<T> {
  protected baseURL = ''

  constructor() {
    this.baseURL = BASE_URL
  }

  getAll(): Promise<T[]> {
    return Axios.get(this.baseURL)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }

  getById(id: number): Promise<T> {
    return Axios.get(this.baseURL + `${id}/`)
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }

  add(item: T): Promise<string> {
    return Axios.post(this.baseURL, item)
      .then((res) => {
        console.log(res.status)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
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
        Alert.alert('Check your Internet Connection!')
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
        Alert.alert('Check your Internet Connection!')
        return 'error'
      })
  }
}
