import React, { Component } from 'react'
import { View, Button, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'

interface MenuScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

class MenuScreen extends Component<MenuScreenProps> {
  render() {
    return (
      <SafeAreaView>
        <View style={{ width: '100%', height: '100%' }}>
          <Button
            color={colors.mainBlue}
            title="Group"
            onPress={() => {
              this.props.navigation.navigate('Group')
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default MenuScreen
