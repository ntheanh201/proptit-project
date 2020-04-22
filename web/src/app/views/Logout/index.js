import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as Actions from '../../redux/action-creators/home'

const Logout = () => {
  const dispatch = useDispatch()
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  dispatch(Actions.updateLoginStatus(false))
  return <Redirect to='/' />
}

export default Logout
