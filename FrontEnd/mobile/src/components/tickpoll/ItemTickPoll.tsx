import React from 'react'
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress'

interface ItemTickPollProps {
  numberTick: number
  totalTick: number
  title: string
}

const ItemTickPoll = ({ title, numberTick, totalTick }: ItemTickPollProps) => {
  const progress = numberTick / totalTick

  return (
    <View style={{ width: '100%', flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ fontSize: 16, marginLeft: 10, flex: 1 }}>{title}</Text>
      <Progress.Bar
        progress={progress}
        height={20}
        style={{ marginLeft: 10 }}
      />
      <Text style={{ fontSize: 16, marginLeft: 10, flex: 1 }}>
        {progress * 100}%
      </Text>
    </View>
  )
}

export default ItemTickPoll
