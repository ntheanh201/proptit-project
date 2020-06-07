import React from 'react'
import BaseService from './BaseService'

class GroupService extends BaseService<Group> {
  constructor() {
    super()
    this.baseURL += 'groups/'
  }
}

export const groupService = new GroupService()
