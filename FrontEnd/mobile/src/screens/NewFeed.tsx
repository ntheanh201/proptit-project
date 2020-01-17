import { BaseScreenProps, BaseScreen } from './BaseScreen'
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right,
  Text,
  Content,
} from 'native-base'
import React from 'react'
import ItemNewFeed from '../components/ItemNewFeed'
import RoundImage from '../components/RoundImage'
import {
  RefreshControl,
  ScrollView,
  NativeScrollEvent,
  View,
  TouchableOpacity,
} from 'react-native'
import CreatePostButton from '../components/CreatePostButton'
import colors from '../values/colors'

interface NewFeedsProps extends BaseScreenProps {}

interface NewFeedsState {
  isRefresh: boolean
}

export default class NewFeeds extends BaseScreen<NewFeedsProps, NewFeedsState> {
  constructor(props: NewFeedsProps) {
    super(props)
    this.state = {
      isRefresh: false,
    }
  }

  isEndNewFeedsList({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  handleScrollEndOfNewFeeds() {
    //TODO load page 2 when user scroll end of list new fist
  }

  handleOnScroll(e: NativeScrollEvent) {
    if (this.isEndNewFeedsList(e)) {
      this.handleScrollEndOfNewFeeds()
    }
  }

  handleOnPressCreatePost() {
    console.log(this.props.navigation.navigate('CreatePost'))
  }

  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <Container style={{ backgroundColor: 'white' }}>
          <Header
            style={{
              backgroundColor: 'white',
              borderBottomColor: 'gray',
              borderBottomWidth: 0.3,
            }}>
            <Left>
              <Button transparent onPress={() => this.showDrawer()}>
                <Icon name="menu" style={{ color: colors.blue01 }} />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: 'black' }}>Tin tức</Title>
            </Body>
            <Right />
          </Header>
          <ScrollView
            style={{ backgroundColor: 'white' }}
            scrollEventThrottle={16}
            onScroll={even => {
              this.handleScrollEndOfNewFeeds()
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => {
                  this.setState({ isRefresh: true })
                }}
              />
            }>
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
            <ItemNewFeed
              isLiked={true}
              newfeed={{ id: '', content: 'Hello' }}
              onPressComment={id => {}}
              onPressHeart={id => {}}
              onPressSave={id => {}}
            />
          </ScrollView>
        </Container>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            bottom: 10,
            justifyContent: 'center',
            width: 70,
            height: 70,
            backgroundColor: colors.blue02,
            borderRadius: 100,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => this.handleOnPressCreatePost()}>
          <Icon
            name="edit"
            type="AntDesign"
            style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
