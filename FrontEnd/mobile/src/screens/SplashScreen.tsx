import * as React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { autoSignIn, AppState, SignInState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParams } from '../navigations/AuthNavigator'
import OneSignal from 'react-native-onesignal'
import * as Sentry from '@sentry/react-native'

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

    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0)

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('913dba2c-9869-4355-a68e-5be7321465c9', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    })
    OneSignal.inFocusDisplaying(2) // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(
      this.myiOSPromptCallback,
    )

    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
  }

  onReceived(notification: any) {
    console.log('Notification received: ', notification)
  }

  onOpened(openResult: any) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  onIds(device: string) {
    console.log('Device info: ', device)
  }

  myiOSPromptCallback = () => {
    // do something with permission value
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
