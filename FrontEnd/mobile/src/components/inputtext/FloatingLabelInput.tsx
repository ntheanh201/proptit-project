import React from 'react'
import {
  View,
  StatusBar,
  TextInput,
  Animated,
  ViewStyle,
  Platform,
} from 'react-native'
import colors from '../../values/colors'

interface FloatingLabelInputProps {
  label?: string
  onTextChange?: (text: string) => void
  borderColor?: string
  textInputColor?: string
  containerStyle?: ViewStyle
  isPassword?: boolean
  value?: string
  multiline?: boolean
  onFocus?: () => void
}

interface FloatingLabelInputState {
  isFocused: boolean
  haveValue: boolean
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
      haveValue: this.props.value ? true : false,
      text: this.props.value ?? '',
    }
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  componentDidMount() {
    if (this.state.haveValue) {
      Animated.timing(this._animatedIsFocused, {
        toValue: this.state.haveValue ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }

  componentDidUpdate() {
    if (this.state.text === '') {
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
      value,
      multiline,
      ...props
    } = this.props
    const labelStyle = {
      position: 'absolute',
      left: 1,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: Platform.OS === 'ios' ? [-5, -20] : [10, -10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 14],
      }),
      color: this.state.isFocused
        ? colors.mainBlue
        : this.state.haveValue
        ? '#000'
        : '#aaa',
    }
    return (
      <View style={[containerStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: this.state.isFocused ? borderColor : '#aaa',
            fontSize: 18,
            color: textInputColor,
          }}
          defaultValue={value}
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
          multiline={multiline}
        />
      </View>
    )
  }
}

export default FloatingLabelInput
