import * as React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  StatusBarIOS,
  FlatList,
} from 'react-native'
import {
  AppState,
  SignInState,
  Post,
  User,
  ImageFormData,
  updateAvatarUser,
  Newsfeed,
} from '../core'
import { connect } from 'react-redux'
import { images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'
import {
  WIDTH,
  HEIGHT,
  getStatusBarHeight,
  isCloseToBottom,
} from '../configs/Function'
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'
import {
  postService,
  authUserService,
  userService,
  newsfeedService,
} from '../services'
import ImagePicker, { Image as ImageP } from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/Entypo'
import { RouteProp } from '@react-navigation/native'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { signInAction } from '../core/actions'
import ItemNewsFeed from '../components/ItemNewsFeed'
import { ActivityIndicator } from 'react-native'

interface ProfileScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'Profile'>
  signInState: SignInState
  updateAvatarUser: typeof updateAvatarUser
}

interface ProfileScreenState {
  index: number
  isLoadingPost: boolean
  isLoadingUser: boolean
  isMyProfile: boolean
  isLoadingMore: boolean
  posts: Newsfeed
  user?: User
}

class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  constructor(props: ProfileScreenProps) {
    super(props)
    this.state = {
      index: 0,
      isLoadingPost: true,
      isLoadingUser: true,
      isLoadingMore: false,
      isMyProfile: true,
      posts: { count: 0, results: [] },
    }
    this.props.navigation.setOptions({
      headerShown: false,
    })
  }

  async componentDidMount() {
    await this.getUserData()
    await this.getUserPost()
  }

  // componentWillReceiveProps(nextProps: ProfileScreenProps) {
  //   if (nextProps.signInState.updateUserSuccess) {
  //     this.getUserPost()
  //   }
  // }

  componentDidUpdate(prevProps: ProfileScreenProps) {
    if (
      !prevProps.signInState.updateUserSuccess &&
      this.props.signInState.updateUserSuccess
    ) {
      this.getUserPost()
    }
  }

  getUserData = async () => {
    const currentUser = this.props.signInState.currentUser!
    if (this.props.route.params.userId === currentUser.id) {
      this.setState({ user: currentUser, isLoadingUser: false })
    } else {
      const user = await userService.getById(this.props.route.params.userId)
      console.log('user', user)
      this.setState({ user, isLoadingUser: false, isMyProfile: false })
    }
  }

  getUserPost = async () => {
    this.setState({ isLoadingPost: true })
    const posts = await postService.getAllwParams('user', this.state.user?.id!)
    this.setState({ posts, isLoadingPost: false })
  }

  getMorePost = async () => {
    this.setState({ isLoadingMore: true })
    const newPosts = await newsfeedService.getPagingNewsfeed(
      this.state.posts.next,
    )
    if (newPosts) {
      newPosts.results.unshift(...this.state.posts.results)
      this.setState({ posts: newPosts, isLoadingMore: false })
    }
  }

  render() {
    if (this.state.isLoadingUser) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <ScrollView
        style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y
          // console.log('AppLog', y)
          if (y >= 200) {
            this.props.navigation.setOptions({
              headerShown: true,
              headerTitle: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: this.state.user?.avatar }}
                    style={{ height: 30, width: 30, borderRadius: 5 }}
                  />
                  <Text style={[styles.bold_text, { marginLeft: 10 }]}>
                    {this.state.user?.displayName}
                  </Text>
                </View>
              ),
              headerBackTitleVisible: false,
              headerTintColor: 'black',
            })
          } else {
            this.props.navigation.setOptions({
              headerShown: false,
            })
          }
          if (
            isCloseToBottom(e.nativeEvent) &&
            this.state.posts.next &&
            !this.state.isLoadingMore
          ) {
            this.getMorePost()
          }
        }}>
        <ImageBackground
          source={{ uri: this.state.user?.cover }}
          style={styles.coverImage}>
          <LinearGradient
            colors={['transparent', '#fff']}
            style={styles.coverImage}>
            <View
              style={[
                styles.headerContainer,
                {
                  justifyContent: this.state.isMyProfile
                    ? 'space-between'
                    : 'flex-start',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack()
                }}>
                <Image source={images.ARROWBACK} style={styles.arrowBack} />
              </TouchableOpacity>
              {this.state.isMyProfile && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    this.props.navigation.navigate('EditProfile')
                  }}>
                  <Text>Edit Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: this.state.isMyProfile
                  ? this.props.signInState.currentUser?.avatar
                  : this.state.user?.avatar,
              }}
              style={styles.avatar}
            />
            {this.state.isMyProfile && (
              <TouchableOpacity
                onPress={() => this.onPressAvatar()}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  borderRadius: 100,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <Icon name="camera" style={{ fontSize: 20 }} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ fontSize: 27 }}>{this.state.user?.displayName}</Text>
            <Text numberOfLines={2}>{this.state.user?.description}</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              paddingVertical: 5,
            }}>
            <TouchableOpacity style={styles.btnInfo}>
              <Text>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnInfo}
              onPress={() => {
                this.props.navigation.navigate('Target', {
                  userId: this.props.route.params.userId,
                  adminMode: false,
                })
              }}>
              <Text> Monthly Target</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnInfo}>
              <Text> More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoadingPost ? (
          <ActivityIndicator animating={true} />
        ) : (
          this.state.posts.results.map((post) => {
            return (
              <ItemNewsFeed
                post={post}
                currentGroup={1}
                navigation={this.props.navigation}
                inProfile={true}
                isShowMore={
                  post.assignedUser.id ===
                  this.props.signInState.currentUser?.id
                }
              />
            )
          })
        )}
        {this.state.isLoadingMore && <ActivityIndicator animating={true} />}
      </ScrollView>
    )
  }

  onPressAvatar() {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      includeExif: true,
      multiple: false,
      cropping: true,
    })
      .then((res) => {
        const image = res as ImageP
        const arr = image.path.split('/')
        const name = arr[arr.length - 1]
        const formData: ImageFormData = {
          name,
          type: image.mime,
          uri: image.path,
        }
        this.props.updateAvatarUser(
          this.props.signInState.currentUser!,
          formData,
        )
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

const styles = StyleSheet.create({
  bold_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  coverImage: {
    width: WIDTH(360),
    height: HEIGHT(180) + getStatusBarHeight(),
    marginBottom: 10,
  },
  headerContainer: {
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBack: {
    marginLeft: 10,
    width: WIDTH(20),
    height: HEIGHT(20),
    resizeMode: 'contain',
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
  avatar: {
    width: WIDTH(130),
    height: WIDTH(130),
    borderRadius: WIDTH(130) / 2,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  nameContainer: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    right: 170,
  },
  gridImage: {
    width: WIDTH(357) / 3,
    height: WIDTH(357) / 3,
    resizeMode: 'cover',
  },
  rowImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  btnInfo: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginLeft: 15,
  },
})

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
