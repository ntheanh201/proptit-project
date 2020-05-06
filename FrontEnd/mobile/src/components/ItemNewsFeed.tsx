import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { Post } from '../core'
import React, { Component } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { images } from '../assets'
import { WIDTH } from '../configs/Function'
import moment from 'moment'
import { postService } from '../services'
import LottieView from 'lottie-react-native'
import { reactionService } from '../services/ReactionService'

interface ItemNewsFeedProps {
  post: Post
  reactionNumber?: number
  commentNumber?: number
  onPress?: () => void
  onPressMore?: () => void
  isShowMore?: boolean
  onPressImage: () => void
}

interface ItemNewFeedState {
  animating: boolean
  reactionId: number
  isLiked: boolean
  reactionNumber: number
}

class ItemNewsFeed extends Component<ItemNewsFeedProps, ItemNewFeedState> {
  animLike = React.createRef<LottieView>()
  canPressLike = true

  constructor(props: ItemNewsFeedProps) {
    super(props)
    // console.log('AppLog', props.post.isLiked)
    this.state = {
      animating: false,
      reactionId: this.props.post.reactionId,
      isLiked: this.props.post.reactionId === -1 ? false : true,
      reactionNumber:
        this.props.reactionNumber ?? this.props.post.reactionNumber!,
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
            source={{ uri: post.photos[0] }}
            style={{ width: width / 2, height: width }}
          />
          <View>
            <Image
              source={{ uri: post.photos[1] }}
              style={{ width: width / 2, height: width / 2 }}
            />
            <Image
              source={{ uri: post.photos[2] }}
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
            source={{ uri: post.photos[0] }}
            style={{ width: width / 2, height: width }}
          />
          <Image
            source={{ uri: post.photos[1] }}
            style={{ width: width / 2, height: width }}
          />
        </View>
      )
    }
    if (post.photos.length === 1) {
      return (
        <Image
          source={{ uri: post.photos[0] }}
          style={{ width, height: width }}
        />
      )
    }
  }

  onPressReaction = async () => {
    if (!this.canPressLike) {
      return
    }
    this.canPressLike = false
    if (this.state.reactionId === -1) {
      this.animLike.current?.play(0, 100)
      const reactionId = await reactionService.addReaction(this.props.post.id!)
      reactionId &&
        this.setState({
          reactionId,
          reactionNumber: this.state.reactionNumber + 1,
        })
    } else {
      const status = await reactionService.delete(this.state.reactionId)
      status === 'success' &&
        this.setState(
          {
            reactionId: -1,
            reactionNumber: this.state.reactionNumber - 1,
            isLiked: !this.state.isLiked,
          },
          () => {
            this.canPressLike = true
          },
        )
    }
  }

  render() {
    const { post, onPress, reactionNumber, commentNumber } = this.props
    const timeago = moment(post.time).fromNow()

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          paddingBottom: 15,
        }}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ width: '100%', flexDirection: 'column' }}>
            <View style={{ width: '100%', padding: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: post.authorAvatar }}
                    style={{ height: 40, width: 40, borderRadius: 20 }}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                        {post.authorName}
                      </Text>
                      {post.groupId !== 0 ? (
                        <>
                          <AntDesign
                            name={'caretright'}
                            style={{ marginLeft: 5 }}
                          />
                          <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                            {post.groupName}
                          </Text>
                        </>
                      ) : null}
                    </View>
                    <Text style={{ marginLeft: 10 }}>{timeago}</Text>
                  </View>
                </View>
                {this.props.isShowMore ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.onPressMore()
                    }}
                    style={{ height: 30, width: 30 }}>
                    <MIcon name="more-horiz" size={20} />
                  </TouchableWithoutFeedback>
                ) : null}
              </View>
              <Text style={{ marginTop: 10 }}>{post.content}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.props.onPressImage ? this.props.onPressImage() : null
          }}>
          {this.renderImage()}
        </TouchableOpacity>
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
                progress={this.state.isLiked ? 1 : 0}
                source={require('../assets/anim/heart.json')}
                onAnimationFinish={() => {
                  this.setState({ isLiked: !this.state.isLiked }, () => {
                    this.canPressLike = true
                  })
                }}
              />
              <Text style={{ marginLeft: 50 }}>
                {this.state.reactionNumber}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EvilIcons name="comment" size={30} />
            <Text style={{ marginLeft: 5 }}>
              {commentNumber ?? post.commentNumber}
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

export default ItemNewsFeed
