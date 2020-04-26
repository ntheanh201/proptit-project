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
import ItemNewsFeed from '../components/ItemNewsFeed'
import { images } from '../assets'
import ItemComment from '../components/comment/ItemComment'
import { StackNavigationProp } from '@react-navigation/stack'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RootStackParams } from '../navigations/AppNavigator'
import { RouteProp } from '@react-navigation/native'
import { postService } from '../services'
import { ActivityIndicator } from 'react-native-paper'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { Post, Reaction, Comment } from '../core'
import { convertToPostType } from '../configs/Function'

interface PostDetailScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<HomeTabParams, 'PostDetail'>
}

interface PostDetailScreenState {
  padding: number
  isLoadingPost: boolean
  post?: Post
  reactions?: Reaction[]
  comments?: Comment[]
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
    }
    this.props.navigation.setOptions({
      title: 'Post',
      headerBackTitle: 'Back',
      headerRight: () => (
        <MCIcons name="magnify" size={25} style={{ marginRight: 10 }} />
      ),
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
      this.props.route.params.params!.postId,
    )
    const post = convertToPostType(data.post)
    console.log(data)
    if (data) {
      this.setState({
        isLoadingPost: false,
        post,
        reactions: data.reactions_info,
        comments: data.comments_info,
      })
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
            reactionNumber={this.state.reactions?.length}
            commentNumber={this.state.comments?.length}
            onPressImage={() => {
              this.props.navigation.navigate('ImageView', {
                listImage: this.state.post!.photos,
              })
            }}
          />
          <View
            style={{
              width: '100%',
              height: 30,
              backgroundColor: 'rgb(245, 245, 245)',
              borderColor: 'rgb(203, 204, 204)',
              borderTopWidth: 0.5,
              justifyContent: 'center',
            }}>
            <Text style={{ marginLeft: 20, color: 'gray' }}>Comment</Text>
          </View>
          {[
            'Good! dddddddddddddddddddddddddddddddd d d d d d  d d d d d d d d d d d d d ',
            'Nice! Bro',
            'Awesome!',
          ].map((content) => (
            <ItemComment content={content} urlAvatar="" />
          ))}
          <View
            style={{
              width: '100%',
              height: 30,
              backgroundColor: 'rgb(245, 245, 245)',
              borderColor: 'rgb(203, 204, 204)',
              borderTopWidth: 0.5,
              justifyContent: 'center',
            }}>
            <Text style={{ marginLeft: 20, color: 'gray' }}>Liked</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              backgroundColor: 'white',
            }}>
            <FlatList
              data={[1, 2, 3, 4]}
              style={{ padding: 5 }}
              renderItem={({ item }) => (
                <Image
                  source={images.AVT_BATMAN}
                  style={{ height: 40, width: 40, borderRadius: 100 }}
                />
              )}
              horizontal={true}
            />
          </View>
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
            source={require('../assets/images/avt_batman.png')}
            style={{ height: 60, width: 60, borderRadius: 100 }}
          />
          <TextInput
            placeholder="Leave Reply"
            multiline={true}
            style={{ flex: 1, fontSize: 20, marginLeft: 10 }}
          />
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={() => this.onPressSend()}>
            <IonIcon name="md-send" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onPressSend = () => {}
}

export default PostDetailScreen
