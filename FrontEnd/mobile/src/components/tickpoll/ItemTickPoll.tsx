import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress'
import {
  Poll,
  AppState,
  User,
  addTickNewsfeed,
  deleteTickNewsfeed,
} from '../../core'

import colors from '../../values/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { newfeedAction } from '../../core/actions'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigations/AppNavigator'

interface ItemTickPollProps {
  poll: Poll
  postId: number
  totalTicks: number
  currentUser?: User
  addTickNewsfeed: typeof addTickNewsfeed
  deleteTickNewsfeed: typeof deleteTickNewsfeed
  navigation: StackNavigationProp<RootStackParams>
}

class ItemTickPoll extends Component<ItemTickPollProps> {
  constructor(props: ItemTickPollProps) {
    super(props)
  }

  checkPollTicked = (): { pollTicked: boolean; tickId: number } => {
    let pollTicked = false
    let tickId = -1
    this.props.poll.ticks.forEach((tick) => {
      if (this.props.currentUser!.id === tick.assignedUser.id) {
        pollTicked = true
        tickId = tick.id
      }
    })
    return { pollTicked, tickId }
  }

  render() {
    const { poll, totalTicks, postId } = this.props
    const result = this.checkPollTicked()
    const listUser = poll.ticks.map((tick) => {
      return tick.assignedUser
    })
    return (
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            result.pollTicked
              ? this.props.deleteTickNewsfeed(poll.id, result.tickId, postId)
              : this.props.addTickNewsfeed(poll.id, postId)
          }}>
          <MaterialCommunityIcons
            name={
              result.pollTicked ? 'checkbox-marked' : 'checkbox-blank-outline'
            }
            size={25}
            style={{ marginLeft: 10 }}
            color="gray"
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'gray',
            justifyContent: 'space-between',
            margin: 10,
            height: 40,
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              width: `${(poll.ticks.length / totalTicks) * 100}%`,
              height: '100%',
              backgroundColor: 'gray',
            }}
          />
          <Text style={{ marginLeft: 5 }}>{poll.question}</Text>
          <Text style={{ marginRight: 5 }}>
            {totalTicks === 0
              ? 0
              : Math.round((poll.ticks.length / totalTicks) * 100)}
            %
          </Text>
        </View>
        <TouchableOpacity
          disabled={poll.ticks.length === 0}
          onPress={() => {
            this.props.navigation.navigate('UserList', { listUser })
          }}>
          <AntDesign
            name="arrowright"
            size={25}
            style={{ marginRight: 10 }}
            color={poll.ticks.length === 0 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.signin.currentUser,
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(newfeedAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemTickPoll)
