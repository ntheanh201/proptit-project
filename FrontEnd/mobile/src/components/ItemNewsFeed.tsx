import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import { Post } from '../core'
import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images } from '../assets'
import { WIDTH } from '../configs/Function'
import moment from 'moment'

interface ItemNewsFeedProps {
  post: Post
  reactionNumber?: number
  commentNumber?: number
  onPress?: () => void
}

const ItemNewsFeed = (props: ItemNewsFeedProps) => {
  const { post, onPress, reactionNumber, commentNumber } = props
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
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                  {post.authorName}
                </Text>
                {post.groupId !== 0 ? (
                  <>
                    <AntDesign name={'caretright'} style={{ marginLeft: 5 }} />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {post.groupName}
                    </Text>
                  </>
                ) : null}
              </View>
              <Text>{timeago}</Text>
            </View>
            <Text style={{ marginTop: 10 }}>{post.content}</Text>
          </View>
          {post.photos.length > 0 ? (
            <Image
              source={{ uri: 'http://apis.aiforce.xyz' + post.photos[0] }}
              resizeMode="cover"
              style={{ width: WIDTH(360), height: WIDTH(360) }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="heart" size={30} />
            <Text style={{ marginLeft: 5 }}>
              {reactionNumber ?? post.reactionNumber}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="comment" size={30} />
            <Text style={{ marginLeft: 5 }}>
              {commentNumber ?? post.commentNumber}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="retweet" size={30} />
            <Text style={{ marginLeft: 5 }}>{post.commentNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemNewsFeed
