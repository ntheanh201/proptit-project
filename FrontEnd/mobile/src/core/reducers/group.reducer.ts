import {
  GroupState,
  GroupAction,
  LOAD_GROUP_PROGRESS,
  LOAD_GROUP_FAIL,
  LOAD_GROUP_SUCCESS,
} from '../types/group.types'

const initialState: GroupState = {
  groups: [],
}

export default (
  state: GroupState = initialState,
  action: GroupAction,
): GroupState => {
  switch (action.type) {
    case LOAD_GROUP_PROGRESS:
      return {
        ...state,
      }
    case LOAD_GROUP_FAIL:
      return {
        ...state,
      }
    case LOAD_GROUP_SUCCESS:
      return {
        groups: action.groups,
      }
    default:
      return state
  }
}
