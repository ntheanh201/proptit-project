import * as React from 'react'
import { MiniUser } from '../core'
import { View, Text, Image } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParams } from '../navigations/AppNavigator'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../values/colors'

interface UserListScreenProps {
  route: RouteProp<RootStackParams, 'UserList'>
}

class UserListScreen extends React.Component<UserListScreenProps> {
  constructor(props: UserListScreenProps) {
    super(props)
  }

  render() {
    if (!this.props.route.params.listUser) {
      return <ActivityIndicator color={colors.mainBlue} animating={true} />
    }
    return (
      <View>
        {this.props.route.params.listUser.map((user) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 20, height: 20 }}
              />
              <Text>{user.displayName}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}

export default UserListScreen
