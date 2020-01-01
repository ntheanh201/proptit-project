import SignIn from '../screens/SignIn'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeNavigator from './HomeNavigator'

const AppNavigator = createSwitchNavigator({
    AuthStack: createStackNavigator({
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                header: null
            }
        }
    }),
    HomeStack: {
        screen: HomeNavigator,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: 'AuthStack',
})

export default createAppContainer(AppNavigator)