import * as React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import { images } from '../assets'
import colors from '../values/colors'
import { AppState, signIn, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { FloatingLabelInput } from '../components'
import { WIDTH, HEIGHT } from '../configs/Function'

interface SignInScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  signIn: typeof signIn
  signInState: SignInState
}

interface SignInScreenState {
  username: string
  password: string
  valid: boolean
  signInClicked: boolean
}

class SignInScreen extends React.Component<
  SignInScreenProps,
  SignInScreenState
> {
  constructor(props: SignInScreenProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      valid: true,
      signInClicked: false,
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Image source={images.APP_ICON_REV} style={styles.logoRev} />
          <FloatingLabelInput
            label="Username"
            containerStyle={styles.txtUsername}
            valid={this.state.valid}
            onTextChange={(text) => {
              this.setState({ username: text })
            }}
            autoCapitalize={'none'}
          />
          <FloatingLabelInput
            label="Password"
            containerStyle={styles.txtPassword}
            isPassword={true}
            valid={this.state.valid}
            onTextChange={(text) => {
              this.setState({ password: text })
            }}
          />
          {/* <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginLeft: 15, marginTop: 10 }}>
            <Text style={styles.txtForgot}>Forgot your password?</Text>
          </TouchableOpacity> */}
          {this.state.signInClicked &&
          this.props.signInState.isSignIn === false ? (
            <Text style={{ color: 'red' }}>
              No active account found with the given credentials
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => {
              // if (
              //   this.state.username.length === 0 &&
              //   this.state.password.length === 0
              // ) {
              //   this.setState({ valid: false })
              // } else {
              this.props.signIn('proptit', 'aiforce.proptit')
              this.setState({ valid: true, signInClicked: true })
              // }
            }}>
            {this.props.signInState.isLoading ? (
              <ActivityIndicator
                animating={true}
                style={{ marginVertical: 10 }}
                color={'#fff'}
              />
            ) : (
              <Text style={styles.txtSignIn}>Sign In</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => {
              this.props.navigation.push('SignUp')
            }}>
            <Text style={styles.txtSignUp}>Create New Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={styles.txtForgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoRev: {
    height: HEIGHT(200),
    width: WIDTH(200),
  },
  txtUsername: {
    width: WIDTH(335),
    marginBottom: 30,
  },
  txtPassword: {
    width: WIDTH(335),
  },
  btnSignIn: {
    backgroundColor: colors.mainBlue,
    width: WIDTH(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
    marginTop: 25,
  },
  btnSignUp: {
    backgroundColor: 'white',
    width: WIDTH(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.mainBlue,
    borderRadius: 36,
    marginTop: 10,
  },
  txtSignIn: {
    color: '#fff',
    marginVertical: 15,
  },
  txtSignUp: {
    color: colors.mainBlue,
    marginVertical: 15,
  },
  txtForgot: {
    color: colors.mainBlue,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
