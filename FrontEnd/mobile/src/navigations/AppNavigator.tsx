import SignIn from '../screens/SignIn'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from '../screens/Home'

const AppNavigator = createSwitchNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: 'SignIn',
})

export default createAppContainer(AppNavigator)