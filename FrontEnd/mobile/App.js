import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MainNavigator from './src/navigations/MainNavigation'

export default class App extends Component {
  render() {
    return (
      <MainNavigator />
    )
  }
}
