import { Dimensions, Platform, StatusBar } from 'react-native'
import { User, Post } from '../core'

const { width, height } = Dimensions.get('screen')
const baseURL = 'http://apis.aiforce.xyz'

export const WIDTH = (w: number) => width * (w / 360)
export const HEIGHT = (h: number) => height * (h / 640)

export const getStatusBarHeight = (): number => {
  const X_WIDTH = 375
  const X_HEIGHT = 812

  const XSMAX_WIDTH = 414
  const XSMAX_HEIGHT = 896

  let haveNotch = false

  const { width: w, height: h } = Dimensions.get('window')

  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
    if (
      (w === X_WIDTH && h === X_HEIGHT) ||
      (w === XSMAX_WIDTH && h === XSMAX_HEIGHT)
    ) {
      haveNotch = true
    }
  }
  return Platform.select({
    ios: haveNotch ? 44 : 20,
    android: StatusBar.currentHeight! > 20 ? StatusBar.currentHeight : 0,
    default: 0,
  })
}

export const convertToUserType = (data: any): User => {
  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatar: data.avatar,
    dateOfBirth: data.date_of_birth,
    description: data.description,
    className: data.class_name,
    email: data.email,
    facebook: data.facebook,
    phoneNumber: data.phone_number,
    regDate: data.reg_date,
    gender: data.gender,
  }
}

export const convertToPostType = (data: any[]): Post[] => {
  return data.map((post: any) => {
    return {
      id: post.id,
      authorId: post.assigned_user_id,
      authorAvatar: baseURL + post.assigned_user_avatar,
      authorName: post.assigned_user_display_name,
      groupId: post.assigned_group_id,
      groupName: post.assigned_group_name,
      content: post.content,
      commentNumber: post.comment_number,
      reactionNumber: post.reaction_number,
      time: post.time,
      type: post.type,
      photos: post.photos,
    }
  })
}
