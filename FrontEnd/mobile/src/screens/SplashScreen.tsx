import * as React from 'react'
import { Text, View } from 'react-native'
import { signInService } from '../service'
import { handleContinueSignIn, AppState, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { BaseScreen, BaseScreenProps } from './BaseScreen'

interface SplashScreenProps extends BaseScreenProps {
  handleContinueSignIn: typeof handleContinueSignIn
  signInState: SignInState
}

class SplashScreen extends BaseScreen<SplashScreenProps> {
  constructor(props: SplashScreenProps) {
    super(props)
  }

  componentDidUpdate() {
    const { isSignIn } = this.props.signInState
    // logD("AppLog", isSignIn);
    if (isSignIn === true) this.navigate('HomeStack')
  }

  componentDidMount() {
    this.props.handleContinueSignIn()
  }

  render() {
    return (
      <View>
        <Text>PROPTIT</Text>
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
