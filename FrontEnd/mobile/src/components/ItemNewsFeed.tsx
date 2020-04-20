import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Post } from '../core'
import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import { images } from '../assets'

interface ItemNewsFeedProps {
  post?: Post
  onPress?: () => void
}

const ItemNewsFeed = (props: ItemNewsFeedProps) => {
  const { post, onPress } = props
  return (
    <View
      style={{
        width: '100%',
        height: 500,
        backgroundColor: 'white',
        paddingBottom: 15,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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
                  source={images.AVT_BATMAN}
                  style={{ height: 50, width: 50, borderRadius: 100 }}
                />
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                  Batman
                </Text>
              </View>
              <Text>2 phút trước</Text>
            </View>
            <Text style={{ marginTop: 10 }}>
              {"Hello ProPTIT, \nI'm Batman"}
            </Text>
          </View>
          <Image
            source={{
              uri:
                'https://res.cloudinary.com/teepublic/image/private/s--uN69cNct--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1551060908/production/designs/4278062_0.jpg',
            }}
            resizeMode="cover"
            style={{ width: '100%', height: '70%' }}
          />
        </View>
      </TouchableOpacity>
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
