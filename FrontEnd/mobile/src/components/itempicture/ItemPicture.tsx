import React from 'react'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../values/colors'

interface ItemPictureProps {
  urlPicture: string
  onClose: () => void
}

export const ItemPicture = ({ onClose, urlPicture }: ItemPictureProps) => {
  return (
    <View style={{ width: 200, height: 200, marginHorizontal: 5 }}>
      <Image
        style={{ width: '100%', height: '100%', borderRadius: 30 }}
        source={{ uri: urlPicture }}
      />
      <Icon
        name="closecircle"
        style={{
          position: 'relative',
          top: -195,
          right: -165,
          color: 'black',
        }}
        size={30}
        onPress={onClose}
      />
    </View>
  )
}
