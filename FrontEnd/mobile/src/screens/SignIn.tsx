import { BaseScreen, BaseScreenProps } from './BaseScreen';
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
import { Image, ActivityIndicator, Dimensions } from 'react-native';
import { ButtonText, LoadingView } from '../components';
import { signIn, SignInState, SignInAction, AppState } from '../core';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signInAction } from '../core/actions';
import { logD } from '../common/LogTool';

interface SignInProps extends BaseScreenProps {
  signIn: typeof signIn;
  signInState: SignInState;
}

class SignIn extends BaseScreen<SignInProps> {

  componentDidUpdate() {
    const { isSuccess } = this.props.signInState;
    logD("AppLog", isSuccess);
    if (isSuccess === true) this.navigate("Home");
  }

  handleSignIn() {
    this.props.signIn("admin", "admin")
  }

  render() {
    const { isLoading } = this.props.signInState;
    return (
      <Container style={{ margin: 10 }}>
        <Content>
          <Container>
            <Row />
            <Row style={{ justifyContent: 'center' }}>
              <Image
                source={require('../data/images/ic_app.png')}
                style={{ width: 100, height: 100 }}
              />
            </Row>
            <Form style={{ width: '100%', marginVertical: 10 }}>
              <EditText title="Tên đăng nhập" />
              <EditText title="Mật khẩu" inputStyle="password" />
            </Form>
            <Row style={{ justifyContent: 'center' }}>
              <ButtonText
                loading={isLoading}
                color={colors.blue01}
                text="Đăng nhập"
                onPress={() => this.handleSignIn()}
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
  signInState: state.signin,
});

const mapDispatchToProps = (dispatch: Dispatch<SignInAction>) =>
  bindActionCreators(signInAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
