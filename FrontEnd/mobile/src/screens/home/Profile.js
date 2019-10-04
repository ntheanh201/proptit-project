import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Header} from '../../components';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Header {...this.props}/>
        <Text>Profile</Text>
      </View>
    )
  }
}
