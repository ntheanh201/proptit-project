import {
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { Component } from 'react'
import ClassicHeader from '../components/header/ClassicHeader'
import ItemNewsFeed from '../components/ItemNewsFeed'
import FloatingButton from '../components/FloatingButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'

interface Item {
  key: string
}

interface NewsFeedScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  isBottom: boolean
  listItems: Item[]
}

interface NewsFeedScreenProps {
  navigation: BottomTabNavigationProp<HomeTabParams>
}

class NewsFeedScreen extends Component<
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
          {/* <ClassicHeader
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
          /> */}
          <FlatList
            data={this.state.listItems}
            renderItem={({ item }) => {
              return (
                <ItemNewsFeed
                  onPress={() => {
                    this.props.navigation.navigate('RootStack', {
                      screen: 'PostDetail',
                    })
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
              this.props.navigation.navigate('RootStack', {
                screen: 'CreatePost',
              })
            }}
          />
        </View>
      </SafeAreaView>
    )
  }

  handleOnPressProfile() {
    this.props.navigation.navigate('Profile')
  }
}

export default NewsFeedScreen
