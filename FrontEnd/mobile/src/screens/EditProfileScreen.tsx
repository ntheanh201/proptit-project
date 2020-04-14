import * as React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
} from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import ClassicHeader from '../components/header/ClassicHeader'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import {
  FloatingLabelInput,
  ScrollViewCustomProps,
} from '../components/inputtext/FloatingLabelInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface EditProfileScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface EditProfileScreenState {
  padding: number
}

class EditProfileScreen extends React.Component<
  EditProfileScreenProps,
  EditProfileScreenState
> {
  scrollViewRef: ScrollViewCustomProps

  constructor(props: EditProfileScreenProps) {
    super(props)
    this.state = {
      padding: 0,
    }
    this.scrollViewRef = {
      position: {
        x: 0,
        y: 0,
      },
    }
  }

  componentDidMount() {
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardShow,
    )
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide,
    )
  }

  onKeyboardShow = (e: any) => {
    this.setState({
      padding: e.endCoordinates.height,
    })
  }

  onKeyboardHide = () => {
    this.setState({
      padding: 0,
    })
  }

  handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollViewRef.position = e.nativeEvent.contentOffset
  }

  render() {
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          ref={(ref) => (this.scrollViewRef.ref = ref!)}
          onScroll={this.handleScroll}
          extraScrollHeight={15}>
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Description'}
            value={'Smart, tough and brutally violent solutions to crime.'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            multiline={true}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            multiline={true}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            multiline={true}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            multiline={true}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    marginHorizontal: 10,
    marginTop: 50,
  },
})

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
