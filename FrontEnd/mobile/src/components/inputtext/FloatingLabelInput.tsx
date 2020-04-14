import React, { RefObject } from 'react'
import ReactNative, {
  View,
  StatusBar,
  TextInput,
  Animated,
  ViewStyle,
  Platform,
  ScrollView,
} from 'react-native'
import colors from '../../values/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export interface ScrollViewCustomProps {
  ref?: KeyboardAwareScrollView
  position: {
    x: number
    y: number
  }
}

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
  scrollView?: ScrollViewCustomProps
}

interface FloatingLabelInputState {
  isFocused: boolean
  haveValue: boolean
  text: string
}

export class FloatingLabelInput extends React.Component<
  FloatingLabelInputProps,
  FloatingLabelInputState
> {
  _animatedIsFocused: Animated.Value = new Animated.Value(0)
  sizeCompanyT: number = 0

  constructor(props: FloatingLabelInputProps) {
    super(props)

    this.state = {
      isFocused: false,
      haveValue: this.props.value ? true : false,
      text: this.props.value ?? '',
    }
  }

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
      scrollView,
      onFocus,
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
          onFocus={(event) => {
            this.setState({
              isFocused: true,
            })
          }}
          onBlur={this.handleBlur}
          secureTextEntry={isPassword}
          multiline={multiline}
          onContentSizeChange={(event) => {
            const scrollHeight = event.nativeEvent.contentSize.height
            if (
              (this.sizeCompanyT && scrollHeight > this.sizeCompanyT) ||
              scrollHeight < this.sizeCompanyT
            ) {
              scrollView &&
                scrollView.ref!.scrollToPosition(
                  scrollView.position.x,
                  scrollView.position.y + (scrollHeight - this.sizeCompanyT),
                )
            }
            this.sizeCompanyT = scrollHeight
          }}
          autoCorrect={false}
        />
      </View>
    )
  }
}
