import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, SignIn, SignUp} from '../screens';

const MainNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    Home: {
      screen: Home,
    }
  }
)

export default createAppContainer(MainNavigator);