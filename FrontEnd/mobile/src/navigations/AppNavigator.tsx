import { createStackNavigator } from 'react-navigation-stack'
import SignIn from '../screens/SignIn'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Button } from 'native-base'
import HomeNavigator from './HomeNavigator'

const AppNavigator = createSwitchNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: 'SignIn',
})

export default createAppContainer(AppNavigator)