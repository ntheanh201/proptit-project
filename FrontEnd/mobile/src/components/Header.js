import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {Header, Left, Body, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../utils';

export default class kHeader extends Component {
  render() {
    const {title, navigation} = this.props;
    return (
      <Header style={{backgroundColor: colors.blue01}} >
        <Left>
          <TouchableWithoutFeedback
            style={{borderRadius: 100}}
            onPress={() => navigation.openDrawer()} >
            <View
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="bars" size={20} color="#ffffff" />
            </View>
          </TouchableWithoutFeedback>
        </Left>
        <Body>
          <Text></Text>
        </Body>
        <Right />
      </Header>
    );
  }
}
