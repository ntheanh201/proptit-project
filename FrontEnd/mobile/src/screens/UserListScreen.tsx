import * as React from 'react'
import { MiniUser } from '../core'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParams } from '../navigations/AppNavigator'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { reactionService } from '../services'

interface UserListScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'UserList'>
}

interface UserListScreenState {
  listUser: MiniUser[]
  isLoadingUser: boolean
}

class UserListScreen extends React.Component<
  UserListScreenProps,
  UserListScreenState
> {
  constructor(props: UserListScreenProps) {
    super(props)
    this.state = {
      listUser: [],
      isLoadingUser: true,
    }
    this.props.navigation.setOptions({ headerBackTitleVisible: false })
  }

  componentDidMount() {
    this.getUserListReation()
  }

  async getUserListReation() {
    if (this.props.route.params.postId) {
      this.setState({ isLoadingUser: true })
      const response = await reactionService.getReactionByPost(
        this.props.route.params.postId,
      )
      const listUser = response.map((item) => {
        return item.assignedUser
      })
      this.setState({ listUser, isLoadingUser: false })
    } else {
      this.setState({ listUser: this.props.route.params.listUser! })
    }
  }

  render() {
    if (this.state.listUser.length === 0) {
      return <ActivityIndicator color={colors.mainBlue} animating={true} />
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.state.listUser.map((user) => {
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
