import { BaseScreen, BaseScreenProps } from './BaseScreen'
import {
  Container,
  Left,
  Icon,
  Title,
  Body,
  Right,
  Button,
  Text,
  Content,
  Header,
} from 'native-base'
import React from 'react'

class Setting extends BaseScreen {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Cài đặt</Title>
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

export default Setting
