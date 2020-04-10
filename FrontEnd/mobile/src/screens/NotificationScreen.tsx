import React, { Component } from 'react'
import { View, TouchableOpacity, Image, FlatList } from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import ClassicHeader from '../components/header/ClassicHeader'
import { images } from '../assets'
import {
  ItemNotification,
  ItemNotificationProps,
} from '../components/ItemNotification'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeTabParams } from 'src/navigations/HomeNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootStackParams } from 'src/navigations/AppNavigator'

interface NotificationScreenProps {
  navigation: BottomTabNavigationProp<HomeTabParams>
}

interface NotificationScreenState {
  refreshing: boolean
  listNoti: ItemNotificationProps[]
}

class NotificationScreen extends Component<
  NotificationScreenProps,
  NotificationScreenState
> {
  constructor(props: NotificationScreenProps) {
    super(props)
    this.state = {
      refreshing: false,
      listNoti: [
        { type: 'like', createTime: '2020-03-19 14:00' },
        { type: 'comment', createTime: '2020-03-20 13:00' },
        { type: 'poll-ticked', createTime: '2020-03-20 14:00' },
        { type: 'confirm', createTime: '2020-03-20 14:00' },
        { type: 'like', createTime: '2020-03-20 14:00' },
      ],
    }
  }

  handleOnPressProfile = () => {
    this.props.navigation.navigate('Profile')
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000)
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        {/* <ClassicHeader
          statusBarHidden={true}
          backgroundColor="white"
          leftComponent={
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPressIn={this.handleOnPressProfile}>
              <Image
                source={images.AVT_BATMAN}
                style={{ width: 30, height: 30 }}
                borderRadius={100}
              />
            </TouchableOpacity>
          }
          headerTitle="NOTIFICATIONS"
        /> */}
        <FlatList
          data={this.state.listNoti}
          renderItem={({ item }) => {
            return (
              <ItemNotification
                type={item.type}
                createTime={item.createTime}
                onPress={() => this.props.navigation.navigate('PostDetail')}
              />
            )
          }}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
