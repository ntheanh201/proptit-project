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
} from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import ClassicHeader from '../components/header/ClassicHeader'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import FloatingLabelInput from '../components/inputtext/FloatingLabelInput'
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
  constructor(props: EditProfileScreenProps) {
    super(props)
    this.state = {
      padding: 0,
    }
  }

  private scrollViewRef: React.RefObject<ScrollView> = React.createRef<
    ScrollView
  >()

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

  render() {
    return (
      <KeyboardAwareScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            paddingBottom: this.state.padding,
            width: '100%',
            height: '100%',
          }}>
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Description'}
            value={'Smart, tough and brutally violent solutions to crime.'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            multiline={true}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            multiline={true}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
          <FloatingLabelInput
            label={'Name'}
            value={'Batman'}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
          />
        </View>
      </KeyboardAwareScrollView>
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
