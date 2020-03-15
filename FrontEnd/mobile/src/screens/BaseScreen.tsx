import React from 'react'
import { AppState } from '../core'
import { types } from '@babel/core'

export class BaseScreen<
  P extends BaseScreenProps = BaseScreenProps,
  S = {}
  > extends React.Component<P, S> {
  navigate(routeID: string) {
    this.props.navigation.navigate(routeID)
  }

  showDrawer() {
    this.props.navigation.openDrawer()
  }

  hideDrawer() {
    this.props.navigation.closeDrawer()
  }

  pop() {
    this.props.navigation.pop()
  }

  replace(routeID: string) {
    this.props.navigation.replace(routeID)
  }

  popToRoot() {
    this.props.navigation.popToTop()
  }

  goBack() {
    this.props.navigation.goBack()
  }
}

export interface BaseScreenProps {
  navigation: any
}
