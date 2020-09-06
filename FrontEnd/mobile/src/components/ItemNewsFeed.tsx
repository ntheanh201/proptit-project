import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import {
  Post,
  AppState,
  addReactionNewsfeed,
  deleteReactionNewsfeed,
  User,
} from '../core'
import React, { Component } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { images } from '../assets'
import { WIDTH } from '../configs/Function'
import moment from 'moment'
import { postService, reactionService } from '../services'
import LottieView from 'lottie-react-native'
import { TickPoll } from './tickpoll'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { newfeedAction } from '../core/actions'
import { connect } from 'react-redux'

interface ItemNewsFeedProps {
  post: Post
  onPressMore?: () => void
  isShowMore?: boolean
  currentGroup: number
  inProfile?: boolean
  navigation: StackNavigationProp<RootStackParams>
  currentUser?: User
  addReactionNewsfeed: typeof addReactionNewsfeed
  deleteReactionNewsfeed: typeof deleteReactionNewsfeed
}

interface ItemNewFeedState {
  animating: boolean
}

class ItemNewsFeed extends Component<ItemNewsFeedProps, ItemNewFeedState> {
  animLike = React.createRef<LottieView>()
  canPressLike = true

  constructor(props: ItemNewsFeedProps) {
    super(props)
    // console.log('AppLog', props.post.isLiked)
    this.state = {
      animating: false,
    }
  }

  renderImage = () => {
    const { post } = this.props
    const width = WIDTH(360)
    if (post.photos.length > 2) {
      return (
        <View
          style={{
            width,
            height: width,
            flexDirection: 'row',
          }}>
          <Image
            source={{ uri: post.photos[0].imgUrl }}
            style={{ width: width / 2, height: width }}
          />
          <View>
            <Image
              source={{ uri: post.photos[1].imgUrl }}
              style={{ width: width / 2, height: width / 2 }}
            />
            <Image
              source={{ uri: post.photos[2].imgUrl }}
              style={{ width: width / 2, height: width / 2 }}
            />
            {post.photos.length > 3 ? (
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: width / 2,
                  height: width / 2,
                  backgroundColor: 'black',
                  opacity: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 36, color: 'white' }}>
                  +{post.photos.length - 3}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      )
    }
    if (post.photos.length === 2) {
      return (
        <View
          style={{
            width,
            height: width,
            flexDirection: 'row',
          }}>
          <Image
            source={{ uri: post.photos[0].imgUrl }}
            style={{ width: width / 2, height: width }}
          />
          <Image
            source={{ uri: post.photos[1].imgUrl }}
            style={{ width: width / 2, height: width }}
          />
        </View>
      )
    }
    if (post.photos.length === 1) {
      return (
        <Image
          source={{ uri: post.photos[0].imgUrl }}
          style={{ width, height: width }}
        />
      )
    }
  }

  checkReaction = (): { isLiked: boolean; reactionId: number } => {
    let isLiked = false
    let reactionId = -1
    this.props.post.reactions!.forEach((reaction) => {
      if (reaction.assignedUser.id === this.props.currentUser!.id) {
        isLiked = true
        reactionId = reaction.id
      }
    })
    return { isLiked, reactionId }
  }

  onPressReaction = async () => {
    if (!this.canPressLike) {
      return
    }
    this.canPressLike = false
    if (this.checkReaction().isLiked) {
      this.animLike.current?.play(100, 0)
    } else {
      this.animLike.current?.play(0, 100)
    }
  }

  render() {
    const { post, currentGroup, inProfile } = this.props
    const timeago = moment(post.time).fromNow()
    const reactionStatus = this.checkReaction()

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          paddingBottom: 15,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('PostDetail', {
              postId: post.id,
            })
          }}>
          <View style={{ width: '100%', flexDirection: 'column' }}>
            <View style={{ width: '100%', padding: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      !inProfile &&
                        this.props.navigation.navigate('Profile', {
                          userId: post.assignedUser.id,
                        })
                    }}>
                    <Image
                      source={{ uri: post.assignedUser.avatar }}
                      style={{ height: 40, width: 40, borderRadius: 20 }}
                    />
                  </TouchableOpacity>
                  <View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          !inProfile &&
                            this.props.navigation.navigate('Profile', {
                              userId: post.assignedUser.id,
                            })
                        }}>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                          {post.assignedUser.displayName}
                        </Text>
                      </TouchableOpacity>
                      {post.assignedGroup.id !== currentGroup && (
                        <>
                          <AntDesign
                            name={'caretright'}
                            style={{ marginLeft: 5 }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate('Group', {
                                groupId: post.assignedGroup.id,
                              })
                            }}>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                              {post.assignedGroup.name}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <Text style={{ marginLeft: 10 }}>{timeago}</Text>
                  </View>
                </View>
                {this.props.isShowMore && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.onPressMore()
                    }}
                    style={{ height: 30, width: 30 }}>
                    <MIcon name="more-horiz" size={20} />
                  </TouchableWithoutFeedback>
                )}
              </View>
              <Text style={{ marginTop: 10 }}>{post.content}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.props.navigation.navigate('ImageView', {
              listImage: post.photos,
            })
          }}>
          {this.renderImage()}
        </TouchableOpacity>
        {this.props.post.polls && (
          <TickPoll
            polls={this.props.post.polls}
            postId={this.props.post.id}
            navigation={this.props.navigation}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <TouchableOpacity onPress={this.onPressReaction} style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                paddingVertical: 15,
              }}>
              <LottieView
                ref={this.animLike}
                loop={false}
                speed={2}
                cacheStrategy={'none'}
                resizeMode="cover"
                progress={reactionStatus.isLiked ? 1 : 0}
                source={require('../assets/anim/heart.json')}
                onAnimationFinish={() => {
                  reactionStatus.isLiked
                    ? this.props.deleteReactionNewsfeed(
                        reactionStatus.reactionId,
                        post.id,
                      )
                    : this.props.addReactionNewsfeed(post.id)
                  this.canPressLike = true
                }}
              />
              <Text style={{ marginLeft: 50 }}>
                {post.reactionNumber ?? post.reactions?.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PostDetail', {
                postId: post.id,
              })
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EvilIcons name="comment" size={30} />
            <Text style={{ marginLeft: 5 }}>
              {post.commentNumber ?? post.comments?.length}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EvilIcons name="retweet" size={30} />
              <Text style={{ marginLeft: 5 }}>{post.commentNumber}</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }
  onPressMore() {
    if (
      this.props.onPressMore != null &&
      this.props.onPressMore !== undefined
    ) {
      this.props.onPressMore()
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.signin.currentUser,
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(newfeedAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemNewsFeed)
