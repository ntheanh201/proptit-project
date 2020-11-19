import Axios from 'axios'
import { Alert } from 'react-native'
import { ImageFormData, Target } from '../core'
import BaseService from './BaseService'

class TargetService extends BaseService<Target> {
  constructor() {
    super()
    this.baseURL += 'target/'
  }

  getCurrentMonthTarget(userId: number): Promise<Target[]> {
    return Axios.get(this.baseURL + `?method=currentMonth&user=${userId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
      })
  }

  addTarget(name: string): Promise<string> {
    return Axios.post(this.baseURL, { name })
      .then((res) => {
        console.log(res.data)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
        return 'error'
      })
  }

  updateTarget(target: Target, resultImage?: ImageFormData): Promise<string> {
    const data = new FormData()
    data.append('name', target.name)
    data.append('status', target.status)
    data.append('isDone', target.isDone ? 'True' : 'False')
    if (target.point) {
      data.append('point', JSON.stringify(target.point))
    }
    if (resultImage) {
      data.append('result_image', resultImage)
    }
    console.log(data)
    return Axios.put(this.baseURL + `${target.id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res.data)
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Check your Internet Connection!')
        return 'error'
      })
  }
}

export const targetService = new TargetService()
