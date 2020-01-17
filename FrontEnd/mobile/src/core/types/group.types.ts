import { Action } from 'redux'
export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCES'
export const LOAD_GROUP_PROGRESS = 'LOAD_GROUP_PROGRESS'
export const LOAD_GROUP_FAIL = 'LOAD_GROUP_FAIL'

export interface Group {
  name: string
}

export interface GroupState {
  groups: Group[]
}

export interface GroupAction extends Action<string> {
  groups: Group[]
}
