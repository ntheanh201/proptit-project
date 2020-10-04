import * as React from 'react'
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  State,
  TapGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import Animated, { cond, greaterOrEq } from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { navigationRef } from '../navigations/AppNavigator'
import { deleteModalRef } from '../../App'
import { AppState, deletePost } from '../core'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { postsAction } from '../core/actions'
import { connect } from 'react-redux'

interface ActionMenuProps {
  deletePost: typeof deletePost
}

interface ActionMenuState {
  focusingPostId: number
  focusingGroupId: number
  focusingGroupName: string
}

class ActionBottomMenu extends React.Component<
  ActionMenuProps,
  ActionMenuState
> {
  sheetRef: React.RefObject<BottomSheet> = React.createRef()

  constructor(props: ActionMenuProps) {
    super(props)
    this.state = {
      focusingPostId: 1,
      focusingGroupId: 1,
      focusingGroupName: '',
    }
  }

  renderContent = () => {
    return (
      <View
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.sheetRef.current && this.sheetRef.current.snapTo(1)
            navigationRef.current?.navigate('CreatePost', {
              postId: this.state.focusingPostId,
              groupId: this.state.focusingGroupId,
              groupName: this.state.focusingGroupName,
            })
          }}
          style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign name="edit" style={{}} size={20} />
          <Text style={{ marginLeft: 10, fontSize: 20 }}>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', padding: 10 }}
          onPress={() => {
            this.sheetRef.current && this.sheetRef.current.snapTo(1)
            Alert.alert(
              'Delete Post?',
              'Do you really want to delete this post?',
              [
                {
                  text: 'Delete',
                  onPress: () => {
                    this.props.deletePost(
                      this.state.focusingPostId,
                      this.state.focusingGroupId,
                    )
                  },
                  style: 'destructive',
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
              { cancelable: false },
            )
          }}>
          <AntDesign name="delete" style={{}} size={20} />
          <Text style={{ marginLeft: 10, fontSize: 20 }}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View
        style={{ height: 25, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: 35,
            height: 6,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.7)',
            marginBottom: 0,
          }}
        />
      </View>
    )
  }

  show = (postId: number, groupId: number, groupName: string) => {
    this.sheetRef.current && this.sheetRef.current.snapTo(0)
    this.setState({
      focusingPostId: postId,
      focusingGroupId: groupId,
      focusingGroupName: groupName,
    })
  }

  hide = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(1)
  }

  sheetOpenValue = new Animated.Value(1)
  overlayOpacity = Animated.interpolate(this.sheetOpenValue, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  })
  pointerEvents = cond(greaterOrEq(0.9, this.sheetOpenValue), 'auto', 'none')

  handleTapStateChange = ({
    nativeEvent,
  }: {
    nativeEvent: { state: State }
  }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.hide()
    }
  }

  render() {
    return (
      <React.Fragment>
        <TapGestureHandler onHandlerStateChange={this.handleTapStateChange}>
          <Animated.View
            pointerEvents={
              Platform.OS === 'android' ? 'none' : this.pointerEvents
            }
            style={[
              StyleSheet.absoluteFill,
              { opacity: this.overlayOpacity, backgroundColor: 'black' },
            ]}
          />
        </TapGestureHandler>
        <BottomSheet
          ref={this.sheetRef}
          overdragResistanceFactor={8}
          enabledInnerScrolling={false}
          snapPoints={[150, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.sheetOpenValue}
          enabledContentTapInteraction={false}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  newsfeedState: state.post,
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(postsAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ActionBottomMenu)
