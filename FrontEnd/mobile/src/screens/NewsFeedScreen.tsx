import {
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  requireNativeComponent,
  Animated,
  Modal,
  Dimensions,
} from 'react-native'
import React, { Component } from 'react'
import ItemNewsFeed from '../components/ItemNewsFeed'
import FloatingButton from '../components/FloatingButton'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { AppState, getNewfeeds, NewFeedState, SignInState, Post } from '../core'
import { newfeedAction } from '../core/actions'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../values/styles'
import BottomSheet from 'react-native-raw-bottom-sheet'
import AIcon from 'react-native-vector-icons/AntDesign'

interface Item {
  key: string
}

interface NewsFeedScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  haveMorePosts: boolean
  listItems: Item[]
}

interface NewsFeedScreenProps {
  navigation: BottomTabNavigationProp<HomeTabParams>
  getNewfeeds: typeof getNewfeeds
  postsState: NewFeedState
  currentUserState: SignInState
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
      haveMorePosts: true,
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
    this.props.getNewfeeds(1)
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
      haveMorePosts: false,
    })

    setTimeout(() => {
      this.setState({ isLoadingMore: false })
    }, 1000)
  }

  componentDidUpdate() {
    // console.log(this.props.postsState.currentNewFeed)
  }

  render() {
    if (!this.props.postsState.currentNewFeed) {
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
            data={this.props.postsState.currentNewFeed}
            renderItem={({ item, index }) => {
              return (
                <ItemNewsFeed
                  onPressImage={() =>
                    this.props.navigation.navigate('ImageView', {
                      screen: 'ImageView',
                      params: {
                        listImage: item.photos,
                      },
                    })
                  }
                  isShowMore={
                    item.authorId ===
                    this.props.currentUserState.currentUser?.id
                  }
                  onPressMore={() => {
                    this.currentPostFocus = item
                    this.bottomSheetRef.current?.open()
                  }}
                  post={item}
                  onPress={() => {
                    this.props.navigation.navigate('PostDetail', {
                      screen: 'PostDetail',
                      params: { postId: item.id! },
                    })
                  }}
                  key={index}
                />
              )
            }}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={this.state.haveMorePosts ? this.loadMore : null}
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
              this.props.navigation.navigate('CreatePost')
            }}
          />
          <BottomSheet
            customStyles={{
              container: {
                backgroundColor: 'transparent',
              },
            }}
            ref={this.bottomSheetRef}
            height={150}>
            <View
              style={{
                padding: 5,
                zIndex: 10,
                elevation: 10,
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  width: 50,
                  height: 7,
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: 'gray',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log('AppLog', 'On Press Edit')
                  this.onPressEditNewFeed(this.currentPostFocus)
                }}
                style={styles.option_button}>
                <AIcon name="edit" style={styles.bold_text} />
                <Text style={[styles.bold_text, { marginLeft: 20 }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option_button}
                onPress={() => {
                  console.log('AppLog', 'On Press Deleted')
                  this.onPressDeleteNewFeed(this.currentPostFocus)
                }}>
                <AIcon name="delete" style={styles.bold_text} />
                <Text style={[styles.bold_text, { marginLeft: 20 }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      </SafeAreaView>
    )
  }

  onPressEditNewFeed(post?: Post) {
    if (post == null || post == undefined) {
      return
    }

    this.props.navigation.navigate('CreatePost', {
      screen: 'CreatePost',
      params: {
        postId: this.currentPostFocus?.id!,
      },
    })

    this.bottomSheetRef.current?.close()
  }

  onPressDeleteNewFeed(post?: Post) {
    if (post === null || post === undefined) {
      return
    }

    //TODO: do somthing with post please :))
  }
}

const mapStateToProps = (state: AppState) => ({
  postsState: state.newfeed,
  currentUserState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(newfeedAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen)
