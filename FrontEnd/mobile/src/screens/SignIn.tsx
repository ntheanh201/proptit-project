import { BaseScreen } from "./BaseScreen";
import React from "react";
import { Form, Container, Content, Row, Col, Button, Text } from 'native-base';
import EditText from "../components/EditText";
import colors from "../values/colors"
import { Image } from 'react-native';
import { ButtonText } from '../components'

export default class SignIn extends BaseScreen {

    handleSignIn() {
        this.navigate('Home');
    }

    render() {
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
                            <ButtonText color={colors.blue01} text="Đăng nhập"/>
                        </Row>
                        <Row />
                    </Container>
                </Content>
            </Container>
        )
    }
}