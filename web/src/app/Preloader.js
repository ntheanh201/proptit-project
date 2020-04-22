import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'core'
import { LoadingIndicator } from 'ui'

import * as Actions from '../app/redux/action-creators/home'

export const PreloaderContext = createContext()

export const Preloader = ({ children }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: true
  })

  useEffect(() => {
    dispatch(Actions.updatePreloader())
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
