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
import { images } from '../assets'

interface ItemNewsFeedProps {
  post: Post
  onPress?: () => void
}

const ItemNewsFeed = (props: ItemNewsFeedProps) => {
  const { post, onPress } = props
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
                  style={{ height: 50, width: 50, borderRadius: 100 }}
                />
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                  {post.authorName}
                </Text>
              </View>
              <Text>2 phút trước</Text>
            </View>
            <Text style={{ marginTop: 10 }}>{post.content}</Text>
          </View>
          {post.photos.length > 0 ? (
            <Image
              source={{ uri: 'http://apis.aiforce.xyz' + post.photos[0] }}
              resizeMode="cover"
              style={{ width: '100%', height: '70%' }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="comment" size={30} />
            <Text style={{ marginLeft: 5 }}>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="heart" size={30} />
            <Text style={{ marginLeft: 5 }}>200</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="retweet" size={30} />
            <Text style={{ marginLeft: 5 }}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemNewsFeed
