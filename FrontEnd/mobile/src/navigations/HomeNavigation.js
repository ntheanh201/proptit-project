import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Profile from '../screens/home/Profile';
import Feed from '../screens/home/Feed';
import Setting from '../screens/home/Setting'
import {dimension} from '../utils';
import MenuSide from '../components/MenuSide'

const HomeNavigator = createSwitchNavigator(
  {
    Profile: {
      screen: Profile,
    },
    Feed: {
      screen: Feed,
    },
    Setting: {
      screen: Setting,
    }
  },
  {
    initialRouteName: 'Profile'
  }
)

export default createAppContainer(HomeNavigator);