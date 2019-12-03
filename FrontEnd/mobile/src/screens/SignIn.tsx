import {BaseScreen, BaseScreenProps} from './BaseScreen';
import React from 'react';
import {
  Form,
  Container,
  Content,
  Row,
  Col,
  Button,
  Text,
  Spinner,
} from 'native-base';
import EditText from '../components/EditText';
import colors from '../values/colors';
import {Image, ActivityIndicator, Dimensions} from 'react-native';
import {ButtonText, LoadingView} from '../components';
import {signIn, UserState, UserAction, AppState, ProUser} from '../core';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {userAction} from '../core/actions';

interface SignInProps extends BaseScreenProps {
  signIn: typeof signIn;
  userState: UserState;
}

class SignIn extends BaseScreen<SignInProps> {
  handleSignIn() {
    this.navigate('Home');
  }

  render() {
    const {user, isLoading} = this.props.userState;
    console.log(this.props.userState);
    if (user !== undefined && user !== null) this.navigate('Home');
    return (
      <Container style={{margin: 10}}>
        <Content>
          <Container>
            <Row />
            <Row style={{justifyContent: 'center'}}>
              <Image
                source={require('../data/images/ic_app.png')}
                style={{width: 100, height: 100}}
              />
            </Row>
            <Form style={{width: '100%', marginVertical: 10}}>
              <EditText title="Tên đăng nhập" />
              <EditText title="Mật khẩu" inputStyle="password" />
            </Form>
            <Row style={{justifyContent: 'center'}}>
              <ButtonText
                loading={isLoading}
                color={colors.blue01}
                text="Đăng nhập"
                onPress={() => this.props.signIn('admin', 'admin')}
              />
            </Row>
            <Row />
          </Container>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) =>
  bindActionCreators(userAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
