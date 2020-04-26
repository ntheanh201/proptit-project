import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
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
  liked: boolean
}

class ItemNewsFeed extends Component<ItemNewsFeedProps, ItemNewFeedState> {
  constructor(props: ItemNewsFeedProps) {
    super(props)
    this.state = {
      liked: this.props.post.isLiked!,
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
    this.setState({ liked: !this.state.liked })
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
          onPress={() => {
            this.props.onPressImage ? this.props.onPressImage() : null
          }}>
          {this.renderImage()}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <TouchableOpacity onPress={this.onPressReaction}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IonIcons
                name={this.state.liked ? 'ios-heart' : 'ios-heart-empty'}
                size={30}
                color={this.state.liked ? 'red' : 'black'}
              />
              <Text style={{ marginLeft: 5 }}>
                {reactionNumber ?? post.reactionNumber}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EvilIcons name="comment" size={30} />
              <Text style={{ marginLeft: 5 }}>
                {commentNumber ?? post.commentNumber}
              </Text>
            </View>
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
