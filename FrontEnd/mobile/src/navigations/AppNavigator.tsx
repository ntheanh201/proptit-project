import { createStackNavigator } from 'react-navigation-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import { createAppContainer } from 'react-navigation'
import { Button } from 'native-base'

const AppNavigator = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: Home,
    }
}, {
    initialRouteName: 'SignIn',
})

export default createAppContainer(AppNavigator)