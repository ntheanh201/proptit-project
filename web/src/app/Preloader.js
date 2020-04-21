import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import environments from 'environments'
import { useState } from 'core'
import { LoadingIndicator } from 'ui'

import * as Actions from '../app/redux/action-creators/home'

export const PreloaderContext = createContext()

export const Preloader = ({ children }) => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state) => state.homeReducer)

  if (!isLogged) {
  }

  const [state, setState] = useState({
    loading: true
  })

  const fetchData = async (userInfo) => {
    // const posts = await axios(`${environments.BASE_URL}posts`)
    // const groups = await axios(`${environments.BASE_URL}groups`)
  }

  useEffect(() => {
    if (
      localStorage &&
      localStorage.getItem('authToken') &&
      localStorage.getItem('userData')
    ) {
      const authToken = JSON.parse(localStorage.getItem('authToken'))
      const { access, refresh } = authToken
      dispatch(Actions.updateLoginStatus(true))
      const userInfo = JSON.parse(localStorage.getItem('userData'))
      dispatch(Actions.updateUserInfo(userInfo))
      fetchData(userInfo)
    }
    setState({ loading: false })
  }, [])

  if (state.loading) {
    return <LoadingIndicator />
  }

  const props = {
    ...state,
    setState
  }

  return (
    <PreloaderContext.Provider value={props}>
      {children}
    </PreloaderContext.Provider>
  )
}
