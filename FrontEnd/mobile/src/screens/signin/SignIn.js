import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class SignIn extends Component {
  render() {
    return (
      <View>
        <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
        <Button title="Home" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}
