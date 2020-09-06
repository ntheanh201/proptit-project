import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native'

interface ItemGroupProps {
  cover: string
  name: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

export const ItemGroup = ({ cover, name, onPress, style }: ItemGroupProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={{ uri: cover }}
        style={{ width: 35, height: 35, borderRadius: 10 }}
      />
      <Text style={{ marginLeft: 10 }}>{name}</Text>
    </TouchableOpacity>
  )
}
