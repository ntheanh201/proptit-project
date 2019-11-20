import { BaseScreen, BaseScreenProps } from "./BaseScreen";
import React, { Dispatch, Reducer } from "react";
import { Form, Container, Content, Row, Col, Button, Text } from 'native-base';
import EditText from "../components/EditText";
import colors from "../values/colors"
import { Image } from 'react-native';
import { ButtonText } from '../components'
import { signIn, UserState, UserAction, AppState } from "../core"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userAction } from "../core/actions";

interface SignInProps extends BaseScreenProps {
    signIn: typeof signIn;
    user: UserState;
}

class SignIn extends BaseScreen<SignInProps> {

    handleSignIn() {
        this.navigate('Home');
    }

    render() {
        console.log("AppLog", this.props);
        return (
            <Container style={{margin: 10}}>
                <Content>
                    <Container>
                        <Row />
                        <Row style={{justifyContent: 'center'}}>
                            <Image source={require('../data/images/ic_app.png')} style={{width: 100, height: 100}}/>
                        </Row>  
                        <Form style={{ width: "100%", marginVertical: 10 }}>
                                <EditText title="Tên đăng nhập" />
                                <EditText title="Mật khẩu" inputStyle="password" />
                        </Form>
                        <Row style={{justifyContent: 'center'}}>
                            <ButtonText color={colors.blue01} text="Đăng nhập" onPress={() => this.props.signIn("admin", "admin")}/>
                        </Row>
                        <Row />
                    </Container>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({user}: AppState) => ({
    loading: user.isLoading,
    user: user.user
})

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => bindActionCreators(userAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);