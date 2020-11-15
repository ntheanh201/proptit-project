import React from 'react'
import AppNavigator from './src/navigations/AppNavigator'
import { DeleteModal } from './src/components'
import { store } from './src/core'
import { Provider } from 'react-redux'

export const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
