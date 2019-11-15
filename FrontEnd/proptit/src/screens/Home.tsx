import { BaseScreen } from "./BaseScreen";
import React from "react";
import { Container, Header, Body, Title, Button, Left, Icon, Right, Row, Col, Grid } from "native-base";
import colors from "../values/colors";

var Loader = require('react-native-spinkit');

export default class Home extends BaseScreen {

    render() {
        return (
            <Container >
                <Row>
                    <Col style={{backgroundColor: colors.blue01}}></Col>
                    <Col style={{backgroundColor: 'black'}}></Col>
                </Row>
                <Row>
                    <Col style={{backgroundColor: 'blue'}}></Col>
                    <Col style={{backgroundColor: 'green'}}></Col>
                </Row>
            </Container>
        );
    }
}