import React from "react";
import { Container, Left, Icon, Title, Body, Right, Button, Text, Content, Header } from "native-base";
import { BaseScreen, BaseScreenProps } from "./BaseScreen";
import { NavigationActions } from "react-navigation";

interface NotificationProps extends BaseScreenProps {

}

class Notification extends BaseScreen<NotificationProps> {


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.showDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Thông báo</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>NotificationScreen</Text>
                </Content>
            </Container>
        )
    }
}

export default Notification;