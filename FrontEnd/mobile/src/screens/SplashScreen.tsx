import * as React from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { signInService } from '../service';
import { handleContinueSignIn, AppState, SignInState } from '../core';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { signInAction } from '../core/actions';
import { connect } from 'react-redux';
import { BaseScreen, BaseScreenProps } from './BaseScreen';

interface SplashScreenProps extends BaseScreenProps {
  handleContinueSignIn: typeof handleContinueSignIn;
  signInState: SignInState;
}

class SplashScreen extends BaseScreen<SplashScreenProps> {
  constructor(props: SplashScreenProps) {
    super(props);
  }

  componentDidUpdate() {
    const { isSignIn, isLoading } = this.props.signInState;
    console.log('AppLog', isSignIn);
    if (!isLoading && isSignIn) this.navigate('HomeStack');
    else if (!isLoading) this.navigate('SignIn');
  }

  componentDidMount() {
    console.log('running');
    this.props.handleContinueSignIn();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#4580C2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../data/images/ic_app.png')}
          style={{ width: 200, height: 200 }}
        />
        <ActivityIndicator
          animating={this.props.signInState.isLoading}
          color="white"
        />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
