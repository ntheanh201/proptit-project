import {
  getAllGroupsService,
  getGroupByIdService,
  updateGroupService,
  deleteGroupService
} from 'services'

import {
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAIL,
  GET_GROUP_BY_ID_SUCCESS,
  GET_GROUP_BY_ID_FAIL,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL
} from '../action-types'

export const getAllGroups = () => {
  return async dispatch => {
    const payload = await getAllGroupsService()
    if (payload) {
      dispatch({
        type: Actions.GET_ALL_GROUPS_SUCCESS,
        payload
      })
    } else {
      dispatch({
        type: Actions.GET_ALL_GROUPS_FAIL,
        payload: null
      })
    }
  }
}

export const getGroupById = id => {
  return async dispatch => {
    const payload = await getGroupByIdService()
    if (payload) {
      dispatch({
        type: Actions.GET_GROUP_BY_ID_SUCCESS,
        payload
      })
    } else {
      dispatch({
        type: Actions.GET_GROUP_BY_ID_FAIL,
        payload: `Can't get the information about this group`
      })
    }
  }
}

export const updateGroup = id => {
  return async dispatch => {
    const payload = await updateGroupService()
    if (payload) {
      dispatch({
        type: Actions.UPDATE_GROUP_SUCCESS,
        payload
      })
    } else {
      dispatch({
        type: Actions.UPDATE_GROUP_FAIL,
        payload: `Can't get the information about this group`
      })
    }
  }
}
