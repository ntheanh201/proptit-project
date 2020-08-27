import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { AppState, Notification } from '../core'
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
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { RootStackParams } from '../navigations/AppNavigator'
import { notificationService } from '../services/NotificationService'
import { ActivityIndicator } from 'react-native-paper'

interface NotificationScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface NotificationScreenState {
  refreshing: boolean
  listNoti?: Notification[]
}

class NotificationScreen extends Component<
  NotificationScreenProps,
  NotificationScreenState
> {
  constructor(props: NotificationScreenProps) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  handleOnPressProfile = () => {
    // this.props.navigation.navigate('Profile')
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000)
  }

  async loadNoti() {
    const listNoti = await notificationService.getAll()
    this.setState({ listNoti })
  }

  render() {
    this.props.navigation.addListener('focus', () => {
      this.loadNoti()
    })
    if (!this.state.listNoti) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <SafeAreaView
        style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <FlatList
          data={this.state.listNoti}
          renderItem={({ item }) => {
            return (
              <ItemNotification
                noti={item}
                onPress={() =>
                  this.props.navigation.navigate('PostDetail', {
                    postId: item.assignedPost.id,
                  })
                }
              />
            )
          }}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
