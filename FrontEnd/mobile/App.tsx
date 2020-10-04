import React from 'react'
import AppNavigator from './src/navigations/AppNavigator'
import { DeleteModal } from './src/components'
import { store } from './src/core'
import { Provider } from 'react-redux'
import ActionBottomMenu from './src/components/ActionBottomMenu'

export const actionBottomMenuRef: any = React.createRef()
export const deleteModalRef: React.RefObject<DeleteModal> = React.createRef<
  DeleteModal
>()

export const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      {/* @ts-ignore */}
      <ActionBottomMenu ref={actionBottomMenuRef} />
      <DeleteModal ref={deleteModalRef} />
    </Provider>
  )
}
