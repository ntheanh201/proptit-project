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
import * as action from '../redux/actions/SignIn';

class MenuSide extends Component {
  render() {
    const {uri, navigation} = this.props;
    return (
      <SafeAreaView style={styles.wrapper}>
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
          <Button transparent onPress={() => navigation.navigate('Feed')}>
            <Text>Feed</Text>
          </Button>
          <Button transparent onPress={() => navigation.navigate('Setting')}>
            <Text>Setting</Text>
          </Button>
          <Button transparent onPress={() => this.props.signOut()}>
            <Text>Sign out</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  wrapperMenu: {},
  wrapperProfile: {
    alignContent: 'center',
    flexDirection: 'row',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(action, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(MenuSide);
