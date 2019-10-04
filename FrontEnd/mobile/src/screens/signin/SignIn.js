import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Loader from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as action from '../../redux/actions/SignIn';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.username = undefined;
    this.password = undefined;
  }

  handlePressSignIn = () => {
    const {signIn} = this.props;
    const username = this.username;
    const password = this.password;
    signIn(username, password);
  };

  componentDidUpdate() {
    const {isSuccess} = this.props.signInModel;
    const {navigation} = this.props;
    if (isSuccess) navigation.replace('Home');
    else if (isSuccess === false) alert('Something is wrong!');
  }

  render() {
    const {isLoading} = this.props.signInModel;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.main}>
            <Image
              source={require('../../assets/images/ic_app.png')}
              style={{height: 100, width: 100, marginBottom: 20}}
            />
          </View>
          <Input
            label="Username"
            containerStyle={styles.input}
            onChangeText={text => (this.username = text)}
          />
          <Input
            label="Password"
            containerStyle={styles.input}
            onChangeText={text => (this.password = text)}
          />
          <Button
            title="Sign in"
            containerStyle={styles.button}
            onPress={this.handlePressSignIn.bind(this)}
          />
          <Loader visible={isLoading? true : false}/>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

SignIn.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  main: {},
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

const mapStateToProps = state => ({
  signInModel: state.signIn,
});

const mapDispatchToProps = dispatch => bindActionCreators(action, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);
