import React from 'react'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../values/colors'

interface ItemPictureProps {
  urlPicture: string
  onClose: () => void
}

const ItemPicture = ({ onClose, urlPicture }: ItemPictureProps) => {
  return (
    <View style={{ width: 100, height: 100, marginHorizontal: 5 }}>
      <Image
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
        source={{ uri: urlPicture }}
      />
      <Icon
        name="closecircle"
        style={{ position: 'relative', top: -95, right: -75, color: 'white' }}
        size={20}
        onPress={() => {
          onClose()
        }}
      />
    </View>
  )
}

export default ItemPicture
