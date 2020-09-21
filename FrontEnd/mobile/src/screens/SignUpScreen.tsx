import * as React from 'react'
import { AppState, SignUpData } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction, signUpAction } from '../core/actions'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { FloatingLabelInput } from '../components'
import { WIDTH } from '../configs/Function'
import colors from '../values/colors'
import { userService } from '../services'

interface SignUpScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface SignUpScreenState {
  username: string
  password: string
  rePassword: string
  email: string
  usernameValid: boolean
  passwordValid: boolean
  rePassValid: boolean
  emailValid: boolean
}

class SignUpScreen extends React.Component<
  SignUpScreenProps,
  SignUpScreenState
> {
  constructor(props: SignUpScreenProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      usernameValid: true,
      emailValid: true,
      passwordValid: true,
      rePassValid: true,
    }
    this.props.navigation.setOptions({
      headerTitle: 'Create Account',
      headerBackTitleVisible: false,
    })
  }

  validatePassword(): boolean {
    if (this.state.password.length === 0) {
      return false
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(this.state.password)) {
      return true
    }
    return false
  }
  validateEmail(): boolean {
    if (this.state.email.length === 0) {
      return false
    }
    if (/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/.test(this.state.email)) {
      return true
    }
    return false
  }

  validateAll(): boolean {
    const passwordValid = this.validatePassword()
    const emailValid = this.validateEmail()
    const rePassValid = this.state.password === this.state.rePassword
    const usernameValid = this.state.username.length !== 0
    this.setState({ passwordValid, emailValid, rePassValid, usernameValid })
    if (emailValid && rePassValid && passwordValid && usernameValid) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FloatingLabelInput
          label="Username"
          containerStyle={styles.input}
          onTextChange={(text) => {
            this.setState({ username: text })
          }}
          valid={this.state.usernameValid}
          autoCapitalize={'none'}
        />
        {!this.state.usernameValid && (
          <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
            <Text style={{ color: 'red' }}>This is a required field</Text>
          </View>
        )}
        <FloatingLabelInput
          label="Password"
          containerStyle={styles.input}
          onTextChange={(text) => {
            this.setState({ password: text })
          }}
          valid={this.state.passwordValid}
          isPassword={true}
        />
        {!this.state.passwordValid && (
          <View>
            <Text style={{ color: 'gray' }}>
              Password must include both characters and numbers. And must be
              more than 7 characters.
            </Text>
          </View>
        )}
        <FloatingLabelInput
          label="Repeat Password"
          containerStyle={styles.input}
          onTextChange={(text) => {
            this.setState({ rePassword: text })
          }}
          valid={this.state.rePassValid}
          isPassword={true}
        />
        {!this.state.rePassValid && (
          <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
            <Text style={{ color: 'red' }}>Password mismatch</Text>
          </View>
        )}
        <FloatingLabelInput
          label="Email"
          containerStyle={styles.input}
          onTextChange={(text) => {
            this.setState({ email: text })
          }}
          valid={this.state.emailValid}
          keyboardType={'email-address'}
        />
        {!this.state.emailValid && (
          <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
            <Text style={{ color: 'red' }}>This is a required field</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={async () => {
            const allFormValid = this.validateAll()
            if (allFormValid) {
              const data: SignUpData = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
              }
              const response = await userService.addNewUser(data)
              if (response === 'success') {
                this.props.navigation.pop()
              } else {
                Alert.alert('Error', response)
              }
            }
          }}>
          <Text style={styles.txtSignUp}>Create Account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: WIDTH(335),
    marginTop: 35,
  },
  btnSignUp: {
    backgroundColor: colors.mainBlue,
    width: WIDTH(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
    marginTop: 25,
  },
  txtSignUp: {
    color: '#fff',
    marginVertical: 15,
  },
})

const mapStateToProps = (state: AppState) => ({
  signUpState: state.signup,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signUpAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
