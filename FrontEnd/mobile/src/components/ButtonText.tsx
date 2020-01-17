import React from 'react'
import { Button, Text, Spinner } from 'native-base'

export default class ButtonText extends React.Component<ButtonTextProps> {
  render() {
    const { text, color, onPress, loading } = this.props
    return (
      <Button
        color={color}
        style={{ flex: 1, justifyContent: 'center' }}
        onPress={onPress}>
        {!loading ? <Text>{text}</Text> : <Spinner />}
      </Button>
    )
  }
}

interface ButtonTextProps {
  text?: string
  color?: string
  loading?: boolean
  onPress: () => void
}
