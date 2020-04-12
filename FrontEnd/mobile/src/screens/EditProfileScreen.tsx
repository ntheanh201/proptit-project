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
import FloatingLabelInput from '../components/inputtext/FloatingLabelInput'
import { RootStackParams } from '../navigations/AppNavigator'

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
      <ScrollView
        style={{
          flex: 1,
          paddingBottom: this.state.padding,
        }}>
        <FloatingLabelInput />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    marginHorizontal: 10,
  },
})

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
