import * as React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { autoSignIn, AppState, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import * as Sentry from '@sentry/react-native'
import messaging from '@react-native-firebase/messaging'
interface SplashScreenProps {
  autoSignIn?: typeof autoSignIn
  signInState?: SignInState
}

class SplashScreen extends React.Component<SplashScreenProps> {
  constructor(props: SplashScreenProps) {
    super(props)

    Sentry.init({
      dsn:
        'https://8a8a5abf7aab49249e429f4128861faa@o404403.ingest.sentry.io/5268014',
    })
    this.requestUserPermission()
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.autoSignIn!()
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
