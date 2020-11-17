import React, { RefObject } from 'react'
import ReactNative, {
  View,
  StatusBar,
  TextInput,
  Animated,
  ViewStyle,
  Platform,
  ScrollView,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native'
import colors from '../../values/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface ScrollViewCustomProps {
  ref?: KeyboardAwareScrollView
  position: {
    x: number
    y: number
  }
}

interface FloatingLabelInputProps extends TextInputProps {
  label?: string
  onTextChange?: (text: string) => void
  textInputColor?: string
  containerStyle?: ViewStyle
  isPassword?: boolean
  value?: string
  valid?: boolean
  onFocus?: () => void
  scrollView?: ScrollViewCustomProps
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
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
      textInputColor,
      containerStyle,
      isPassword,
      value,
      scrollView,
      onFocus,
      valid,
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
            borderBottomColor: this.state.isFocused
              ? colors.mainBlue
              : valid !== null && valid === false
              ? 'red'
              : '#aaa',
            fontSize: 18,
            color: textInputColor,
            paddingBottom: Platform.OS === 'android' ? -5 : 0,
          }}
          defaultValue={value}
          onChangeText={(text) => {
            this.setState({
              text: text,
            })
            onTextChange && onTextChange(text)
          }}
          onFocus={(event) => {
            this.setState({
              isFocused: true,
            })
          }}
          onBlur={this.handleBlur}
          secureTextEntry={isPassword}
          onContentSizeChange={(event) => {
            // const scrollHeight = event.nativeEvent.contentSize.height
            // if (
            //   (this.sizeCompanyT && scrollHeight > this.sizeCompanyT) ||
            //   scrollHeight < this.sizeCompanyT
            // ) {
            //   Platform.OS === 'ios' &&
            //     scrollView &&
            //     scrollView.ref!.scrollToPosition(
            //       scrollView.position.x,
            //       scrollView.position.y + 2 * scrollHeight,
            //     )
            // }
            // this.sizeCompanyT = scrollHeight
          }}
          autoCorrect={false}
        />
        {valid !== null && valid === false && (
          <MaterialIcons
            name="error-outline"
            color="red"
            size={20}
            style={{ position: 'absolute', right: 0 }}
          />
        )}
      </View>
    )
  }
}
