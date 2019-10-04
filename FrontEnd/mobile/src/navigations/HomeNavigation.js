import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Profile from '../screens/home/Profile';
import Feed from '../screens/home/Feed';
import {dimension} from '../utils';

const HomeNavigator = createDrawerNavigator(
  {
    Profile: {
      screen: Profile,
    },
    Feed: {
      screen: Feed,
    }
  },
  {
    initialRouteName: 'Feed',
    drawerWidth: dimension.fullWidth / 2,
    drawerPosition: 'left',
  }
)

export default createAppContainer(HomeNavigator);