import { BaseScreen } from "./BaseScreen";
import React, { RefObject } from "react";
import { Form, Container, Content, Row, Col, Button, Text } from 'native-base';
import EditText from "../components/EditText";
import colors from "../values/colors"
import {Image, KeyboardAvoidingView, Platform} from 'react-native';

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
                                <EditText title="Username" />
                                <EditText title="Password" inputStyle="password" />
                        </Form>
                        <Row style={{justifyContent: 'center'}}>
                            <Button color={colors.blue01} style={{flex: 1, justifyContent: 'center', marginTop: 20}}>
                                <Text>
                                    Sign In
                                </Text>
                            </Button>
                        </Row>
                        <Row />
                    </Container>
                </Content>
            </Container>
        )
    }
}