import { Action } from 'redux'
import { User } from './user.types'
export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCES'
export const LOAD_GROUP_PROGRESS = 'LOAD_GROUP_PROGRESS'
export const LOAD_GROUP_FAIL = 'LOAD_GROUP_FAIL'

export interface Group {
  id: number
  name: string
  cover: string
  isAdmin?: boolean
  members: Pick<User, 'id' | 'displayName' | 'avatar'>[]
  admins: Pick<User, 'id' | 'displayName' | 'avatar'>[]
}

export type MiniGroup = Pick<Group, 'id' | 'name' | 'cover' | 'isAdmin'>

export interface GroupState {
  groups: Group[]
}

export interface GroupAction extends Action<string> {
  groups: Group[]
}
