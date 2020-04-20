import {
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { Component } from 'react'
import ItemNewsFeed from '../components/ItemNewsFeed'
import FloatingButton from '../components/FloatingButton'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { AppState, getNewfeeds, NewFeedState } from '../core'
import { newfeedAction } from '../core/actions'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
  getNewfeeds: typeof getNewfeeds
  postsState: NewFeedState
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
  componentDidMount() {
    this.props.getNewfeeds('1')
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
            backgroundColor: 'blue',
            flexDirection: 'column',
          }}>
          <FlatList
            data={this.props.postsState.currentNewFeed}
            renderItem={({ item }) => {
              return (
                <ItemNewsFeed
                  post={item}
                  onPress={() => {
                    console.log('AppLog', this.props)
                    this.props.navigation.navigate('PostDetail')
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
              style={{ marginVertical: 10 }}
            />
          ) : null}
          <FloatingButton
            onPress={() => {
              this.props.navigation.navigate('CreatePost')
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  postsState: state.newfeed,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(newfeedAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen)
