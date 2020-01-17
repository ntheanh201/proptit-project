import React from 'react'
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
import { BaseScreen, BaseScreenProps } from './BaseScreen'
import { NavigationActions } from 'react-navigation'
import colors from '../values/colors'

interface NotificationProps extends BaseScreenProps {}

class Notification extends BaseScreen<NotificationProps> {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent onPress={() => this.showDrawer()}>
              <Icon name="menu" style={{ color: colors.blue01 }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'black' }}>Thông báo</Title>
          </Body>
        </Header>
        <Content>
          <Text>NotificationScreen</Text>
        </Content>
      </Container>
    )
  }
}

export default Notification
