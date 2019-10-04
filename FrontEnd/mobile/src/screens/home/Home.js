import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HomeNavigator from '../../navigations/HomeNavigation';

export default class Home extends Component {
  render() {
    return <HomeNavigator />;
  }
}

Home.navigationOptions = {
  header: null,
};
