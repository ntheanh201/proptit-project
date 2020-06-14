import * as Actions from '../action-types'

const STATE_INIT = {
  groups: null,
  loading: false,
  message: null,
  errorMessage: null,
  groupId: null,
  group: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_GROUPS_SUCCESS:
      return { ...state, groups: payload }
    case Actions.GET_ALL_GROUPS_FAIL:
      return { ...state, groups: [] }
    case Actions.GET_GROUP_BY_ID_SUCCESS:
      return { ...state, group: payload }
    case Actions.GET_GROUP_BY_ID_FAIL:
      return { ...state, errorMessage: payload }
    case Actions.UPDATE_GROUP_SUCCESS:
      return { ...state, group: payload.group, message: payload.message }
    case Actions.UPDATE_GROUP_FAIL:
      return { ...state, errorMessage: payload }
    case Actions.DELETE_GROUP_SUCCESS:
      return { ...state, message: payload }
    case Actions.DELETE_GROUP_FAIL:
      return { ...state, errorMessage: payload }
    default:
      return state
  }
}
