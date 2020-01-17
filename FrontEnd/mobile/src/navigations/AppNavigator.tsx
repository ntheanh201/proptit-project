import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeNavigator from './HomeNavigator'
import SplashScreen from '../screens/SplashScreen'

const AppNavigator = createSwitchNavigator(
  {
    SplashStack: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    // AuthStack: createStackNavigator({
    //   SignIn: {
    //     screen: SignIn,
    //     navigationOptions: {
    //       header: null,
    //     },
    //   },
    // }),
    // HomeStack: {
    //   screen: HomeNavigator,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
  },
  {
    initialRouteName: 'SplashStack',
  },
)

export default createAppContainer(AppNavigator)
