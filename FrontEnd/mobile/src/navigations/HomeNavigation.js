import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Profile from '../screens/home/Profile';
import Feed from '../screens/home/Feed';
import Setting from '../screens/home/Setting'
import {dimension} from '../utils';
import MenuSide from '../components/MenuSide'

const HomeNavigator = createDrawerNavigator(
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
    initialRouteName: 'Feed',
    drawerWidth: dimension.fullWidth * 2 / 3,
    drawerPosition: 'left',
    contentComponent: MenuSide,
  }
)

export default createAppContainer(HomeNavigator);