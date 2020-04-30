import { View, Image, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ItemCommentProps {
  urlAvatar: string
  content: string
  name: string
}

const ItemComment = (props: ItemCommentProps) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderColor: 'rgb(203, 204, 204)',
        borderTopWidth: 1,
        backgroundColor: 'white',
      }}>
      <Image
        source={{ uri: props.urlAvatar }}
        style={{ height: 40, width: 40, borderRadius: 20 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
        <Text>{props.content}</Text>
      </View>
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Icon name="back" style={{ color: 'gray' }} size={20} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="hearto" style={{ color: 'gray' }} size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default ItemComment
