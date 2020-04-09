import * as React from 'react'
import { BaseScreenProps, BaseScreen } from './BaseScreen'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'
import { WIDTH, HEIGHT } from '../configs/Function'
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view'
import ItemNewsFeed from '../components/ItemNewsFeed'

interface ProfileScreenProps extends BaseScreenProps {}

interface ProfileScreenState {
  index: number
  routes: Route[]
}

const ActivityRoute = () => (
  <ScrollView>
    <ItemNewsFeed />
    <ItemNewsFeed />
  </ScrollView>
)

const ImageRoute = () => (
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

class ProfileScreen extends BaseScreen<ProfileScreenProps, ProfileScreenState> {
  constructor(props: ProfileScreenProps) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Hoạt động' },
        { key: 'second', title: 'Ảnh' },
      ],
    }
  }

  render() {
    const renderScene = SceneMap({
      first: ActivityRoute,
      second: ImageRoute,
    })
    return (
      <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
        <ImageBackground source={images.BGR_BATMAN} style={styles.coverImage}>
          <LinearGradient
            colors={['transparent', '#fff']}
            style={styles.coverImage}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  this.props.navigation.goBack()
                }}>
                <Image source={images.ARROWBACK} style={styles.arrowBack} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  this.navigate('EditProfile')
                }}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <Image source={images.AVT_BATMAN} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={{ fontSize: 39 }}>Batman</Text>
            <Text>Smart, tough and brutally violent solutions to crime.</Text>
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
    height: HEIGHT(250),
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: WIDTH(150),
    height: WIDTH(150),
    borderRadius: WIDTH(150) / 2,
    position: 'absolute',
    right: 20,
    bottom: -20,
  },
  nameContainer: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    right: 150,
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

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
