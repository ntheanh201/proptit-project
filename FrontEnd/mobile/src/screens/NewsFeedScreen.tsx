import {
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  requireNativeComponent,
  Animated,
  Modal,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native'
import React, { Component } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'
import {
  AppState,
  getNewsFeed,
  PostsState,
  SignInState,
  Post,
  getMoreGroupPost,
} from '../core'
import { postsAction } from '../core/actions'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../values/styles'
import BottomSheet from 'reanimated-bottom-sheet'
import { postService } from '../services'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { FloatingButton } from '../components'
import ItemNewsFeed from '../components/ItemNewsFeed'
import { actionBottomMenuRef } from '../../App'

interface Item {
  key: string
}

interface NewsFeedScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  listItems: Item[]
  deleteDialogTrigger: boolean
}

interface NewsFeedScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  getNewsFeed: typeof getNewsFeed
  getMoreGroupPost: typeof getMoreGroupPost
  newsfeedState: PostsState
  signInState: SignInState
}

class NewsFeedScreen extends Component<
  NewsFeedScreenProps,
  NewsFeedScreenState
> {
  bottomSheetRef = React.createRef<BottomSheet>()
  /**
   * current selected post when user press more icon (...)
   */
  currentPostFocus?: Post

  constructor(props: NewsFeedScreenProps) {
    super(props)
    this.state = {
      refreshing: false,
      isLoadingMore: false,
      deleteDialogTrigger: false,
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
    this.props.getNewsFeed()
    // const focus = this.props.navigation.addListener('focus', () => {
    //   this.props.getNewsFeed()
    // })
  }

  componentDidUpdate(prevProps: NewsFeedScreenProps) {
    if (
      !prevProps.signInState.updateUserSuccess &&
      this.props.signInState.updateUserSuccess
    ) {
      this.props.getNewsFeed()
    }
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    })

    await this.props.getNewsFeed()

    this.setState({ refreshing: false })
  }

  loadMore = async () => {
    this.setState({
      isLoadingMore: true,
    })

    await this.props.getMoreGroupPost(1)

    this.setState({
      isLoadingMore: false,
    })
  }

  render() {
    if (!this.props.newsfeedState.currentNewsfeed) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexDirection: 'column',
          }}>
          <FlatList
            // style={{ zIndex: 111 }}
            // contentContainerStyle={{ zIndex: 111 }}
            data={this.props.newsfeedState.currentNewsfeed.results}
            renderItem={({ item, index }) => {
              return (
                <ItemNewsFeed
                  post={item}
                  currentGroup={1}
                  navigation={this.props.navigation}
                  isShowMore={
                    item.assignedUser.id ===
                    this.props.signInState.currentUser?.id
                  }
                  key={index}
                />
              )
            }}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={
              this.props.newsfeedState.currentNewsfeed.next
                ? this.loadMore
                : null
            }
            ListFooterComponent={
              this.state.isLoadingMore ? (
                <ActivityIndicator
                  animating={this.state.isLoadingMore}
                  style={{ marginVertical: 10 }}
                />
              ) : null
            }
          />
          <FloatingButton
            onPress={() => {
              this.props.navigation.navigate('CreatePost', {
                groupId: 1,
                groupName: '',
              })
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
  async deletePost() {
    console.log('AppLog', 'Delete Post!')
    const id = this.currentPostFocus?.id
    if (id == null) {
      return
    }
    const status = await postService.delete(id)
    if (status === 'success') {
      this.props.getNewsFeed()
    }
  }

  onPressEditNewFeed(post?: Post) {
    if (post) {
      this.props.navigation.navigate('CreatePost', {
        postId: this.currentPostFocus?.id!,
        groupId: this.currentPostFocus?.assignedGroup.id!,
        groupName: this.currentPostFocus?.assignedGroup.name!,
      })
    }
  }

  async onPressDeleteNewFeed(post?: Post) {
    setTimeout(() => {
      this.setState({
        deleteDialogTrigger: true,
      })
    }, 250)
  }
}

const mapStateToProps = (state: AppState) => ({
  newsfeedState: state.post,
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(postsAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen)
