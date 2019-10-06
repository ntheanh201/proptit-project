import React, {Component} from 'react';
import {Text, View, StatusBar, BackHandler} from 'react-native';
import HomeNavigator from '../../navigations/HomeNavigation';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer';
import MenuSide from '../../components/MenuSide';
import {colors} from '../../utils';
import { NavigationActions } from 'react-navigation';

class Home extends Component {
  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  navigateToScreen = route => {
    
    const navigation = NavigationActions.navigate({
      routeName:  route,
    })
    this._homeNavigation.dispatch(navigation);
  }

  handleOnPressItemMenu = index => {
    switch (index) {
      case 0:
        this.navigateToScreen('Feed');
        break;
      case 1:
        this.navigateToScreen('Setting');
        break;
      case 2:
        this.props.navigation.navigate('SignIn');
        break;
    }
    this.closeControlPanel();
  };

  componentDidMount() {
    // console.log('AppLog-Home', this._homeNavigation);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.isOpen) this.closeControlPanel();
      else BackHandler.exitApp();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidUpdate() {
    //check sign in
    const {isLogout} = this.props.signInModel;
    const {navigation} = this.props;
    if (isLogout) navigation.navigate('SignIn');

    //check drawer
    const {isOpen} = this.props.drawer;
    // console.log('AppLog-Home', isOpen);
    if (isOpen) this.openControlPanel();
    else this.closeControlPanel();
  }

  render() {
    return (
      <Drawer
        onOpen={() => (this.isOpen = true)}
        onClose={() => (this.isOpen = false)}
        type="overlay"
        tapToClose={true}
        ref={ref => (this._drawer = ref)}
        content={
          <MenuSide onPressItem={this.handleOnPressItemMenu.bind(this)} />
        }
        openDrawerOffset={1 / 3}>
        <HomeNavigator ref={ref => (this._homeNavigation = ref)} />
      </Drawer>
    );
  }
}

Home.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  signInModel: state.signIn,
  drawer: state.drawer,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
