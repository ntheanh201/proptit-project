import { Point } from '../core'
import BaseService from './BaseService'

class PointService extends BaseService<Point> {
  constructor() {
    super()
    this.baseURL += 'point/'
  }
}

export const pointService = new PointService()
