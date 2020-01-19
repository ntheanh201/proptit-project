import * as React from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { signInService } from '../services'
import { handleContinueSignIn, AppState, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { BaseScreen, BaseScreenProps } from './BaseScreen'
import { images } from '../assets'

interface SplashScreenProps extends BaseScreenProps {
  handleContinueSignIn: typeof handleContinueSignIn
  signInState: SignInState
}

class SplashScreen extends BaseScreen<SplashScreenProps> {
  constructor(props: SplashScreenProps) {
    super(props)
  }

  componentDidUpdate() {
    const { isSignIn, isLoading } = this.props.signInState
    console.log('AppLog', isSignIn)
    // if (!isLoading && isSignIn) {
    // } else if (!isLoading) this.navigate('SignInScreen')
  }

  componentDidMount() {
    console.log('running')
    // this.props.handleContinueSignIn()
    setTimeout(() => {
      this.navigate('SignIn')
    }, 3000)
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#4580C2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={images.APP_ICON} style={{ width: 200, height: 200 }} />
        <ActivityIndicator animating={true} color="#fff" />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
