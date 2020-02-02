import BaseService from './BaseService'
import axios from 'axios'

export interface Group {
  name: string
}

class GroupService extends BaseService<Group> {
  constructor() {
    super()
    this.baseURL += '/groups'
  }

  getByGroup(groupId: string): Promise<Group[]> {
    return axios
      .get(this.baseURL + `/${groupId}`)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}

export const groupService = new GroupService()
