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
} from 'react-native'
import { images } from '../assets'
import colors from '../values/colors'
import { AppState, signIn, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { ActivityIndicator } from 'react-native-paper'
import { FloatingLabelInput } from '../components'

interface SignInScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  signIn: typeof signIn
  signInState: SignInState
}

class SignInScreen extends React.Component<SignInScreenProps> {
  constructor(props: SignInScreenProps) {
    super(props)
  }

  componentDidUpdate() {
    // if (this.props.signInState.isSignIn) {
    //   this.props.navigation.navigate('HomeStack')
    // }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={images.APP_ICON_REV} style={styles.logoRev} />
          <FloatingLabelInput
            label="Username"
            borderColor={colors.mainBlue}
            containerStyle={styles.textInput}
          />
          <FloatingLabelInput
            label="Password"
            borderColor={colors.mainBlue}
            containerStyle={styles.textInput}
            isPassword={true}
          />
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => {
              this.props.signIn('proptit', 'aiforce.proptit')
            }}>
            {this.props.signInState.isLoading ? (
              <ActivityIndicator
                animating={true}
                style={{ marginVertical: 10 }}
                color={'#fff'}
              />
            ) : (
              <Text style={styles.textSignIn}>Sign In</Text>
            )}
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
    height: 200,
    width: 200,
  },
  textInput: {
    width: 350,
    height: 50,
    marginBottom: 10,
  },
  buttonSignIn: {
    backgroundColor: colors.mainBlue,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
    marginTop: 25,
  },
  textSignIn: {
    color: '#fff',
    marginVertical: 15,
  },
})

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
