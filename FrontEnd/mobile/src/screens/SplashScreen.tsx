import * as React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { handleContinueSignIn, AppState, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParams } from '../navigations/AuthNavigator'

interface SplashScreenProps {
  handleContinueSignIn: typeof handleContinueSignIn
  signInState: SignInState
  navigation: StackNavigationProp<AuthStackParams>
}

class SplashScreen extends React.Component<SplashScreenProps> {
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
      this.props.navigation.navigate('SignIn')
    }, 1000)
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
