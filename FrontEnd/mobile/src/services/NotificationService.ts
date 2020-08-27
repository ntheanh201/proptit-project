import BaseService from './BaseService'
import { Notification } from '../core/types'
import Axios from 'axios'

class NotificationService extends BaseService<Notification> {
  constructor() {
    super()
    this.baseURL += 'notifications/'
  }
}

export const notificationService = new NotificationService()
