import {
  SafeAreaView,
  View,
  Platform,
  Image,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React from 'react'
import ClassicHeader from '../components/header/ClassicHeader'
import { BaseScreen, BaseScreenProps } from './BaseScreen'
import { _rightComponentStyle } from '../components/header/ClassicHeader.style'
import ItemNewsFeed from '../components/ItemNewsFeed'
import FloatingButton from '../components/FloatingButton'

interface Item {
  key: string
}

interface NewsFeedScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  isBottom: boolean
  listItems: Item[]
}

interface NewsFeedScreenProps extends BaseScreenProps {}

class NewsFeedScreen extends BaseScreen<
  NewsFeedScreenProps,
  NewsFeedScreenState
> {
  constructor(props: NewsFeedScreenProps) {
    super(props)
    this.state = {
      refreshing: false,
      isLoadingMore: false,
      isBottom: false,
      listItems: [
        {
          key: '1',
        },
        {
          key: '2',
        },
        {
          key: '3',
        },
      ],
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    })

    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000)
  }

  loadMore = () => {
    console.log('running', this.state.isLoadingMore)
    this.setState({
      isLoadingMore: true,
    })

    setTimeout(() => {
      this.setState({ isLoadingMore: false })
    }, 1000)
  }

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexDirection: 'column',
          }}>
          <ClassicHeader
            statusBarHidden={true}
            backgroundColor="white"
            leftComponent={
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPressIn={() => this.handleOnPressProfile()}>
                <Image
                  source={require('../assets/images/bgr_batman.png')}
                  style={{ width: 30, height: 30 }}
                  borderRadius={100}
                />
              </TouchableOpacity>
            }
            headerTitle="HOME"
          />
          <FlatList
            data={this.state.listItems}
            renderItem={({ item }) => {
              return (
                <ItemNewsFeed
                  onPress={() => {
                    this.navigate('Detail')
                  }}
                />
              )
            }}
            initialNumToRender={2}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={this.loadMore}
          />
          {this.state.isLoadingMore ? (
            <ActivityIndicator
              animating={this.state.isLoadingMore}
              style={{ marginVertical: 20 }}
            />
          ) : null}
          <FloatingButton
            onPress={() => {
              this.navigate('CreatePost')
            }}
          />
        </View>
      </SafeAreaView>
    )
  }

  handleOnPressProfile() {
    this.navigate('Profile')
  }

  wait = (timeout: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout)
    })
  }
}

export default NewsFeedScreen
