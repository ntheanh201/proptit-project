import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { Icon } from 'native-base'
import colors from '../values/colors'
import { ViewStyle } from 'react-native'

const CreatePostButton = () => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        width: 70,
        height: 70,
        zIndex: 10,
        backgroundColor: colors.blue02,
        borderRadius: 100,
      }}>
      <Icon
        name="edit"
        type="AntDesign"
        style={{ backgroundColor: 'transparent', color: 'white' }}
      />
    </TouchableOpacity>
  )
}

export default CreatePostButton
