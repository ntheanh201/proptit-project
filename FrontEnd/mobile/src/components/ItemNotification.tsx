import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images } from '../assets'
import colors from '../values/colors'
import moment from 'moment'

export interface ItemNotificationProps {
  postId?: string
  type?: 'like' | 'comment' | 'confirm' | 'poll-ticked'
  userId?: string
  createTime?: string
  onPress?: () => void
}

export const ItemNotification = (props: ItemNotificationProps) => {
  let content = ''
  switch (props.type) {
    case 'like':
      content = ' đã thích bài viết của bạn.'
      break
    case 'comment':
      content = ' đã bình luận về bài viết.'
      break
    case 'confirm':
      content = ' đã xác nhận bài viết.'
      break
    case 'poll-ticked':
      content = ' đã bầu chọn trong bài thăm dò ý kiến.'
      break
  }

  const time = moment(props.createTime, 'YYYY-MM-DD hh:mm').fromNow()

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={props.onPress}>
      <Image source={images.AVT_BATMAN} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text>
          <Text style={styles.txtName}>Batman</Text>
          <Text>{content}</Text>
        </Text>
        <Text style={styles.txtTime}>{time}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  contentContainer: {
    flex: 1,
  },
  txtName: {
    fontWeight: 'bold',
    color: colors.mainBlue,
  },
  txtTime: {
    color: 'gray',
  },
})
