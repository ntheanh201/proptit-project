import * as React from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import { images } from '../assets'
import { StackNavigationProp } from '@react-navigation/stack'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RootStackParams } from '../navigations/AppNavigator'
import { RouteProp } from '@react-navigation/native'
import { postService, commentService } from '../services'
import { ActivityIndicator } from 'react-native-paper'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { Post, Reaction, Comment, AppState, User } from '../core'
import { ItemComment } from '../components'
import ItemNewsFeed from '../components/ItemNewsFeed'
import { connect } from 'react-redux'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { postsAction } from '../core/actions'

interface PostDetailScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'PostDetail'>
  currentUser?: User
}

interface PostDetailScreenState {
  padding: number
  isLoadingPost: boolean
  isSendingComment: boolean
  post?: Post
  newComment: string
}

class PostDetailScreen extends React.Component<
  PostDetailScreenProps,
  PostDetailScreenState
> {
  constructor(props: PostDetailScreenProps) {
    super(props)
    this.state = {
      padding: 0,
      isLoadingPost: true,
      isSendingComment: false,
      newComment: '',
    }
    this.props.navigation.setOptions({
      title: 'Post',
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    })
  }

  componentDidMount() {
    this.getPosts()
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardShow,
    )
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide,
    )
  }

  getPosts = async () => {
    const data = await postService.getFullPostById(
      this.props.route.params.postId,
    )
    if (data) {
      this.setState({
        isLoadingPost: false,
        post: data,
      })
    }
  }

  async reloadComment() {
    const comments = await commentService.getByPostId(
      this.props.route.params.postId,
    )
    const post = JSON.parse(JSON.stringify(this.state.post))
    post.comments = comments
    if (comments) {
      this.setState({ post })
    }
  }

  onPressSend = async () => {
    this.setState({ isSendingComment: true })
    const status = await commentService.addComment(
      this.props.route.params.postId,
      this.state.newComment,
    )
    if (status === 'success') {
      this.setState({ isSendingComment: false, newComment: '' })
      this.reloadComment()
    }
  }

  onKeyboardShow = (e: any) => {
    this.setState({
      padding: e.endCoordinates.height,
    })
  }

  onKeyboardHide = () => {
    this.setState({
      padding: 0,
    })
  }

  render() {
    if (this.state.isLoadingPost) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingBottom: Platform.OS === 'ios' ? this.state.padding : 0,
        }}>
        <ScrollView
          style={{
            width: '100%',
            height: '90%',
          }}>
          <ItemNewsFeed
            post={this.state.post!}
            currentGroup={1}
            navigation={this.props.navigation}
            isShowMore={
              this.state.post!.assignedUser.id === this.props.currentUser?.id
            }
            inPostDetail={true}
          />
          {this.state.post!.reactions.length > 0 ? (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 30,
                backgroundColor: 'white',
                borderColor: 'rgb(203, 204, 204)',
                borderTopWidth: 0.5,
                justifyContent: 'center',
              }}>
              <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>
                {this.state.post?.reactions.length} likes
              </Text>
            </TouchableOpacity>
          ) : null}
          {this.state.post?.comments &&
            this.state.post?.comments.map((comment) => {
              return (
                <ItemComment
                  content={comment.content}
                  urlAvatar={comment.assignedUser.avatar}
                  name={comment.assignedUser.displayName}
                />
              )
            })}
        </ScrollView>
        <View
          style={{
            width: '100%',
            elevation: 10,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            source={images.AVT_BATMAN}
            style={{ height: 60, width: 60, borderRadius: 100 }}
          />
          <TextInput
            placeholder="Leave Reply"
            value={this.state.newComment}
            multiline={true}
            style={{ flex: 1, fontSize: 20, marginLeft: 10 }}
            onChangeText={(text) => {
              this.setState({ newComment: text })
            }}
          />
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={() => this.onPressSend()}>
            {this.state.isSendingComment ? (
              <ActivityIndicator animating={true} />
            ) : (
              <IonIcon name="md-send" size={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state: AppState) => ({
  currentUser: state.signin.currentUser,
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(postsAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen)
