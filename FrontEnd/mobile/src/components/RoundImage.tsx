import { Button } from 'native-base'
import React from 'react'
import { Image } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

const RoundImage = (props: RoundImageProps) => {
  const { source, onPress } = props
  var { size } = props

  size ? null : (size = 40)

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{ alignSelf: 'baseline', borderRadius: 100 }}>
      <Image source={source} style={{ width: size, height: size }} />
    </TouchableHighlight>
  )
}

interface RoundImageProps {
  source: ImageSourcePropType
  size?: number | string
  onPress?: () => void
}

export default RoundImage
