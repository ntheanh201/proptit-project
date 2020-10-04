import * as React from 'react'
import { MiniUser } from '../core'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParams } from '../navigations/AppNavigator'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'

interface UserListScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'UserList'>
}

class UserListScreen extends React.Component<UserListScreenProps> {
  constructor(props: UserListScreenProps) {
    super(props)
    this.props.navigation.setOptions({ headerBackTitleVisible: false })
  }

  render() {
    if (!this.props.route.params.listUser) {
      return <ActivityIndicator color={colors.mainBlue} animating={true} />
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.props.route.params.listUser.map((user) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('Profile', { userId: user.id })
              }}>
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 36,
                }}
              />
              <Text
                style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15 }}>
                {user.displayName}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

export default UserListScreen
