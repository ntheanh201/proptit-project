import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';
import HomeNavigator from '../../navigations/HomeNavigation';
import {connect} from 'react-redux';

class Home extends Component {
  componentDidUpdate() {
    const {isLogout} = this.props.signInModel;
    const {navigation} = this.props;
    if (isLogout) navigation.navigate('SignIn');
  }

  render() {
    return <HomeNavigator />;
  }
}

Home.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  signInModel: state.signIn,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
