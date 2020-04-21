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

export const convertToPostType = (data: any): Post => {
  return {
    id: data.id,
    authorId: data.assigned_user_id,
    authorAvatar: baseURL + data.assigned_user_avatar,
    authorName: data.assigned_user_display_name,
    groupId: data.assigned_group_id,
    groupName: data.assigned_group_name,
    content: data.content,
    commentNumber: data.comment_number,
    reactionNumber: data.reaction_number,
    time: data.time,
    type: data.type,
    photos: data.photos,
  }
}

export const convertPostsArray = (data: any[]): Post[] => {
  return data.map((post: any) => {
    return convertToPostType(post)
  })
}
