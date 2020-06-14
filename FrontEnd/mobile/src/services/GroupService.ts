import React from 'react'
import BaseService from './BaseService'
import { Group } from '../core'
import Axios from 'axios'
import { convertToGroupType } from '../configs/Function'

class GroupService extends BaseService<Group> {
  constructor() {
    super()
    this.baseURL += 'groups/'
  }

  getGroupById(id: number): Promise<Group> {
    return Axios.get(this.baseURL + `${id}/`)
      .then((res) => {
        const group = convertToGroupType(res.data)
        return group
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }
}

export const groupService = new GroupService()
