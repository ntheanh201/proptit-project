import BaseService from './BaseService'

export interface Test {
  userId?: number
  id?: number
  title?: string
  body?: string
}

class TestService extends BaseService<Test> {
  constructor() {
    super()
    this.baseURL += '/posts'
  }
}

export const testService = new TestService()
