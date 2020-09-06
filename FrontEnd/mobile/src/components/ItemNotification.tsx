import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images } from '../assets'
import colors from '../values/colors'
import moment from 'moment'
import { Notification } from '../core'

export interface ItemNotificationProps {
  noti: Notification
  onPress?: () => void
}

export const ItemNotification = (props: ItemNotificationProps) => {
  let content = ''
  switch (props.noti.type) {
    case 0:
      content = ' đã đăng bài trong '
      break
    case 1:
      content = ' đã bình luận về bài viết.'
      break
    case 2:
      content = ' đã xác nhận bài viết.'
      break
    case 3:
      content = ' đã bầu chọn trong bài thăm dò ý kiến.'
      break
  }

  const time = moment(props.noti.createdTime).fromNow()

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={props.onPress}>
      <Image
        source={{ uri: props.noti.assignedUser.avatar }}
        style={styles.avatar}
      />
      <View style={styles.contentContainer}>
        <Text>
          <Text style={styles.txtName}>
            {props.noti.assignedUser.displayName}
          </Text>
          <Text>
            <Text>{content}</Text>
            <Text style={styles.txtGroupName}>
              {props.noti.assignedGroup.name}
            </Text>
          </Text>
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
  txtGroupName: {
    fontWeight: 'bold',
  },
})
