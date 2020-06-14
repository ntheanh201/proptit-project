/* eslint-disable camelcase */

import axios from 'axios'
import environments from 'environments'
import { convertToGroupArray, convertToGroupType } from 'helpers'

export const getAllGroupsService = () => {
  return axios
    .get(`${environments.BASE_URL}groups/`)
    .then(response => {
      return convertToGroupArray(response.data)
    })
    .catch(error => {
      // if (error.response) {
      //   return error.response.status
      // }
      return null
    })
}

export const getGroupByIdService = id => {
  return axios
    .get(`${environments.BASE_URL}groups/${id}/`)
    .then(response => {
      return convertToGroupType(response.data)
    })
    .catch(error => {
      return null
    })
}

export const addGroupService = group => {
  const data = ''
  return axios
    .post(`${environments.BASE_URL}groups/`, data)
    .then(res => {
      console.log(res.data)
      return 'success'
    })
    .catch(err => {
      return 'error'
    })
}

export const updateGroupService = id => {
  const data = ''
  return axios
    .patch(`${environments.BASE_URL}groups/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      return null
    })
}

export const deleteGroupService = id => {
  return axios
    .delete(`${environments.BASE_URL}groups/${id}/`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return null
    })
}
