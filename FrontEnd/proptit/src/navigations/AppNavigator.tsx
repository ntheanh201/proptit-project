import { createStackNavigator } from 'react-navigation-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import { createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
    SignIn: {
        screen: SignIn,
    },
    Home: {
        screen: Home,
    }
}, {
    initialRouteName: 'SignIn',
})

export default createAppContainer(AppNavigator)