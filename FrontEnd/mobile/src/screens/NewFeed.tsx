import { BaseScreenProps, BaseScreen } from "./BaseScreen";
import { Container, Header, Left, Button, Icon, Title, Body, Right, Text } from "native-base";
import React from "react";

interface NewFeedsProps extends BaseScreenProps {

}

export default class NewFeeds extends BaseScreen<NewFeedsProps> {

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
                        <Title>Tin tức</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        )
    }
}