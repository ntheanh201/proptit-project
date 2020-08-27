import React from 'react'
import BaseService from './BaseService'
import { Group } from '../core'
import Axios from 'axios'

class GroupService extends BaseService<Group> {
  constructor() {
    super()
    this.baseURL += 'groups/'
  }
}

export const groupService = new GroupService()
