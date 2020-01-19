import * as React from 'react'
import { BaseScreenProps, BaseScreen } from './BaseScreen'
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Text } from 'native-base'
import { images } from '../assets'
import colors from '../values/colors'
import {
  OutlinedTextField,
  TextField,
  FilledTextField,
} from 'react-native-material-textfield'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'

interface SignInScreenProps extends BaseScreenProps {}

class SignInScreen extends BaseScreen<SignInScreenProps> {
  constructor(props: SignInScreenProps) {
    super(props)
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={images.APP_ICON_REV} style={styles.logoRev} />
          <TextField
            containerStyle={styles.textInput}
            label="Username"
            keyboardType="default"
            tintColor={colors.mainBlue}
          />
          <TextField
            containerStyle={styles.textInput}
            label="Password"
            keyboardType="default"
            secureTextEntry={true}
            tintColor={colors.mainBlue}
          />
          <TouchableOpacity style={styles.buttonSignIn}>
            <Text
              style={styles.textSignIn}
              onPress={() => {
                this.navigate('HomeStack')
              }}>
              Sign In
            </Text>
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
