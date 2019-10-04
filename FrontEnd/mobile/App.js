import React, { Component } from 'react';
import { Text, View} from 'react-native';
import MainNavigator from './src/navigations/MainNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}
