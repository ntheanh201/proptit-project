import * as React from 'react'
import { BaseScreenProps, BaseScreen } from './BaseScreen'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'
import { WIDTH, HEIGHT } from '../configs/Function'
import { TabView, SceneMap, Route } from 'react-native-tab-view'

interface ProfileScreenProps extends BaseScreenProps {}

interface ProfileScreenState {
  index: number
  routes: Route[]
}

const ActivityRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#000' }} />
)

const ImageRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#4580C2' }} />
)

class ProfileScreen extends BaseScreen<ProfileScreenProps, ProfileScreenState> {
  constructor(props: ProfileScreenProps) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'ABCD' },
        { key: 'second', title: 'EFRG' },
      ],
    }
  }

  render() {
    const renderScene = SceneMap({
      first: ActivityRoute,
      second: ImageRoute,
    })
    return (
      <View>
        <ImageBackground source={images.BGR_BATMAN} style={styles.coverImage}>
          <LinearGradient
            colors={['transparent', '#fff']}
            style={styles.coverImage}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Image source={images.ARROWBACK} style={styles.arrowBack} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton}>
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
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => {
            console.log(index)
            this.setState({ index })
          }}
          initialLayout={{ width: WIDTH(360) }}
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
    marginTop: 50,
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
})

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
