import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as signInAction from '../redux/actions/SignIn';
import * as drawerAction from '../redux/actions/Drawer';
import {colors} from '../utils';

class MenuSide extends Component {
  render() {
    // console.log('AppLog-MenuSide', this.props);
    const {uri, onPressItem} = this.props;
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={{flex: 1, margin: 10}}>
          <ScrollView style={styles.wrapperMenu}>
            <View style={styles.wrapperProfile}>
              <Avatar
                source={
                  uri === null || uri === undefined
                    ? require('../assets/images/ic_app.png')
                    : {uri: uri}
                }
                size={30}
                rounded
              />
              <Text style={{margin: 10}}>Tran Duy Cong Khanh</Text>
            </View>
            <Button transparent onPress={() => onPressItem(0)}>
              <Text>Feed</Text>
            </Button>
            <Button transparent onPress={() => onPressItem(1)}>
              <Text>Setting</Text>
            </Button>
            <Button transparent onPress={() => onPressItem(2)}>
              <Text>Sign out</Text>
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapperMenu: {},
  wrapperProfile: {
    alignContent: 'center',
    flexDirection: 'row',
  },
});

const mapDispatchToProps = dispatch => ({
  action: {
    signIn: signInAction,
    drawer: drawerAction,
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(MenuSide);
