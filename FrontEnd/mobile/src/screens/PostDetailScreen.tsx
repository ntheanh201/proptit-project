import * as React from 'react'
import { BaseScreenProps, BaseScreen } from './BaseScreen'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import ItemNewsFeed from '../components/ItemNewsFeed'
import ClassicHeader from '../components/header/ClassicHeader'
import { images } from '../assets'
import { WIDTH } from '../configs/Function'

interface PostDetailScreenProps extends BaseScreenProps {}

class PostDetailScreen extends BaseScreen {
  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <ItemNewsFeed />
        <View style={{ width: WIDTH(360), marginTop: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              width: WIDTH(360),
              alignItems: 'center',
            }}>
            <Image
              source={images.AVT_BATMAN}
              style={{
                width: WIDTH(30),
                height: WIDTH(30),
                borderRadius: WIDTH(30) / 2,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontWeight: 'bold' }}>Batman</Text>
            <Text style={{ position: 'absolute', right: 10 }}>
              vài giây trước
            </Text>
          </View>
          <Text style={{ marginLeft: 52 }}>Hello Batman =))</Text>
        </View>
      </View>
    )
  }
}

export default PostDetailScreen
