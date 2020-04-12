import React from 'react'
import { View, StatusBar, TextInput, Animated, ViewStyle } from 'react-native'
import colors from '../../values/colors'

interface FloatingLabelInputProps {
  label?: string
  onTextChange?: (text: string) => void
  borderColor?: string
  textInputColor?: string
  containerStyle?: ViewStyle
  isPassword?: boolean
}

interface FloatingLabelInputState {
  isFocused: boolean
  text: string
}

class FloatingLabelInput extends React.Component<
  FloatingLabelInputProps,
  FloatingLabelInputState
> {
  _animatedIsFocused: Animated.Value = new Animated.Value(0)

  constructor(props: FloatingLabelInputProps) {
    super(props)

    this.state = {
      isFocused: false,
      text: '',
    }
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  componentDidUpdate() {
    if (this.state.text == '') {
      Animated.timing(this._animatedIsFocused, {
        toValue: this.state.isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }

  render() {
    const {
      label,
      onTextChange,
      borderColor,
      textInputColor,
      containerStyle,
      isPassword,
      ...props
    } = this.props
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', colors.mainBlue],
      }),
    }
    return (
      <View style={[containerStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            fontSize: 20,
            color: textInputColor,
          }}
          onChangeText={(text) => {
            this.setState({
              text: text,
            })
            onTextChange ? onTextChange(text) : null
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          secureTextEntry={isPassword}
        />
      </View>
    )
  }
}

export default FloatingLabelInput
