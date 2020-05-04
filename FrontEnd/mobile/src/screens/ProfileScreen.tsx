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
import { AppState, SignInState, Post } from '../core'
import { connect } from 'react-redux'
import { images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'
import {
  WIDTH,
  HEIGHT,
  getStatusBarHeight,
  convertPostsArray,
} from '../configs/Function'
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view'
import ItemNewsFeed from '../components/ItemNewsFeed'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../values/colors'
import { postService } from '../services'

interface ProfileScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  signInState: SignInState
}

interface ProfileScreenState {
  index: number
  routes: Route[]
  isLoadingPost: boolean
  posts: Post[]
}

class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  constructor(props: ProfileScreenProps) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Hoạt động' },
        { key: 'second', title: 'Ảnh' },
      ],
      isLoadingPost: true,
      posts: [],
    }
    this.getUserPost()
  }

  getUserPost = async () => {
    const data = await postService.getAllwParams(
      'user',
      this.props.signInState.currentUser?.id!,
    )
    const posts = convertPostsArray(data)
    this.setState({ posts, isLoadingPost: false })
  }

  ActivityRoute = () => {
    return (
      <>
        <ActivityIndicator
          animating={this.state.isLoadingPost}
          color={colors.mainBlue}
          style={{ marginTop: 10 }}
        />
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => {
            return <ItemNewsFeed post={item} />
          }}
        />
      </>
    )
  }

  ImageRoute = () => (
    <ScrollView>
      <View style={styles.rowImageContainer}>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowImageContainer}>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowImageContainer}>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.gridImage} source={images.BGR_BATMAN} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

  render() {
    const renderScene = SceneMap({
      first: this.ActivityRoute,
      second: this.ImageRoute,
    })
    return (
      <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
        <ImageBackground source={images.BGR_BATMAN} style={styles.coverImage}>
          <LinearGradient
            colors={['transparent', '#fff']}
            style={styles.coverImage}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  this.props.navigation.navigate('EditProfile')
                }}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <Image source={images.AVT_BATMAN} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={{ fontSize: 27 }}>
              {this.props.signInState.currentUser!.displayName}
            </Text>
            <Text numberOfLines={2}>
              {this.props.signInState.currentUser!.description}
            </Text>
          </View>
        </ImageBackground>
        <TabView
          style={{ marginTop: 10 }}
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={renderScene}
          onIndexChange={(index) => {
            this.setState({ index })
          }}
          initialLayout={{ width: WIDTH(360) }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: '#fff' }}
              activeColor="#000"
              inactiveColor="#000"
              indicatorStyle={{ backgroundColor: '#4580C2' }}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coverImage: {
    width: WIDTH(360),
    height: HEIGHT(180),
  },
  headerContainer: {
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrowBack: {
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
})

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

export default connect(mapStateToProps)(ProfileScreen)
