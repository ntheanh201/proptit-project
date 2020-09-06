import { View, TouchableOpacity, Text, Image } from 'react-native'
import React, { Component } from 'react'
import ItemTickPoll from './ItemTickPoll'
import { Poll } from '../../core'
import colors from '../../values/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigations/AppNavigator'

interface TickPollProps {
  polls: Poll[]
  postId: number
  navigation: StackNavigationProp<RootStackParams>
}

export class TickPoll extends Component<TickPollProps> {
  constructor(props: TickPollProps) {
    super(props)
  }

  getTotalTicks(): number {
    let total = 0
    this.props.polls.forEach((poll) => {
      total += poll.ticks.length
    })
    return total
  }

  render() {
    const totalTicks = this.getTotalTicks()
    return (
      <View style={{ width: '100%' }}>
        {this.props.polls.map((poll, index) => (
          <ItemTickPoll
            poll={poll}
            totalTicks={totalTicks}
            key={index}
            postId={this.props.postId}
            navigation={this.props.navigation}
          />
        ))}
      </View>
    )
  }
}
