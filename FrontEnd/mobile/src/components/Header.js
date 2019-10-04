import React, {Component} from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import {Header, Left, Body, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class kHeader extends Component {
  render() {
    const {title, navigation} = this.props;
    return (
      <Header>
        <Left>
          <TouchableNativeFeedback
            style={{borderRadius: 100}}
            onPress={() => navigation.openDrawer()}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="bars" size={20} color="#ffffff" />
            </View>
          </TouchableNativeFeedback>
        </Left>
        <Body>
          <Text></Text>
        </Body>
        <Right />
      </Header>
    );
  }
}
