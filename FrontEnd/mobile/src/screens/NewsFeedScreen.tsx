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
  Alert,
} from 'react-native'
import React, { Component } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { AppState, getNewsFeed, PostsState, SignInState, Post } from '../core'
import { postsAction } from '../core/actions'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../values/styles'
import BottomSheet from 'react-native-raw-bottom-sheet'
import AIcon from 'react-native-vector-icons/AntDesign'
import { postService } from '../services'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { FloatingButton } from '../components'
import ItemNewsFeed from '../components/ItemNewsFeed'

interface Item {
  key: string
}

interface NewsFeedScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  haveMorePosts: boolean
  listItems: Item[]
  deleteDialogTrigger: boolean
}

interface NewsFeedScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  getNewsFeed: typeof getNewsFeed
  newsfeedState: PostsState
  signInState: SignInState
}

class NewsFeedScreen extends Component<
  NewsFeedScreenProps,
  NewsFeedScreenState
> {
  bottomSheetRef = React.createRef<BottomSheet>()
  dialogDeleteDialog = React.createRef<BottomSheet>()
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

  loadMore = () => {
    this.setState({
      isLoadingMore: true,
      haveMorePosts: false,
    })

    setTimeout(() => {
      this.setState({ isLoadingMore: false })
    }, 1000)
  }

  render() {
    if (!this.props.newsfeedState.currentNewsfeed) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <SafeAreaView>
        <Modal
          ref={this.dialogDeleteDialog}
          animationType="fade"
          transparent={true}
          visible={this.state.deleteDialogTrigger}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}>
              <View
                style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.bold_text,
                    {
                      width: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    },
                  ]}>
                  Do you want delete this post?
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      deleteDialogTrigger: false,
                    })
                  }}
                  style={{
                    flex: 1,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.bold_text]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      deleteDialogTrigger: false,
                    })
                    this.deletePost()
                  }}
                  style={{
                    flex: 1,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.bold_text, { color: 'red' }]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexDirection: 'column',
          }}>
          <FlatList
            data={this.props.newsfeedState.currentNewsfeed}
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
                  onPressMore={() => {
                    this.currentPostFocus = item
                    this.bottomSheetRef.current?.open()
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
              this.props.navigation.navigate('CreatePost', {
                groupId: 1,
                groupName: '',
              })
            }}
          />
          <BottomSheet
            duration={200}
            closeOnPressBack={true}
            closeOnDragDown={true}
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
              <TouchableOpacity
                onPress={() => {
                  // console.log('AppLog', 'On Press Edit')
                  this.onPressEditNewFeed(this.currentPostFocus)
                }}
                style={styles.option_button}>
                <AIcon name="edit" style={styles.bold_text} />
                <Text style={[styles.bold_text, { marginLeft: 20 }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option_button}
                onPress={() => {
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
    this.bottomSheetRef.current?.close()
    if (post) {
      this.props.navigation.navigate('CreatePost', {
        postId: this.currentPostFocus?.id!,
        groupId: this.currentPostFocus?.assignedGroup.id!,
        groupName: this.currentPostFocus?.assignedGroup.name!,
      })
    }
  }

  async onPressDeleteNewFeed(post?: Post) {
    this.bottomSheetRef.current?.close()

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
