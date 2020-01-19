import * as React from 'react'
import { BaseScreenProps, BaseScreen } from './BaseScreen'
import { View, Text, Image, ImageBackground } from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import { images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'
import { WIDTH, HEIGHT } from '../configs/Function'

interface ProfileScreenProps extends BaseScreenProps {}

class ProfileScreen extends BaseScreen<ProfileScreenProps> {
  constructor(props: ProfileScreenProps) {
    super(props)
  }

  render() {
    return (
      <View>
        <ImageBackground
          source={images.BGR_BATMAN}
          style={{ width: WIDTH(360), height: HEIGHT(250) }}>
          <LinearGradient
            colors={['transparent', '#fff']}
            style={{
              width: WIDTH(360),
              height: HEIGHT(250),
            }}
          />
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
