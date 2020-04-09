import { View, Image, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ItemCommentProps {
  urlAvatar: string
  content: string
}

const ItemComment = ({ content }: ItemCommentProps) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        borderColor: 'rgb(203, 204, 204)',
        borderTopWidth: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '60%',
        }}>
        <Image
          source={require('../../assets/images/avt_batman.png')}
          style={{ height: 40, width: 40, borderRadius: 100 }}
        />
        <Text style={{ marginLeft: 10 }}>{content}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Icon name="back" style={{ color: 'gray' }} size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="hearto" style={{ color: 'gray' }} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemComment
