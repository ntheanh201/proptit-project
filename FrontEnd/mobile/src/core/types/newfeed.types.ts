import { Action } from 'redux'

export const LOAD_NEWFEED_SUCCESS = 'LOAD_NEWFEED_SUCCESS'
export const LOAD_NEWFEED_PROGRESS = 'LOAD_NEWFEED_PROGRESS'
export const LOAD_NEWFEED_FAIL = 'LOAD_NEWFEED_FAIL'

export interface NewFeedState {
  isLoadingNewFeed: boolean
  currentNewFeed?: Post[]
}

export interface NewFeedAction extends Action<string> {
  newfeeds?: Post[]
}

export interface Post {
  id?: number
  authorId?: number
  authorAvatar?: string
  authorName?: string
  groupId: number
  groupName?: string
  content: string
  reactionNumber?: number
  commentNumber?: number
  time?: Date
  type: Number
  photos: string[]
  reactionId?: number
}

export interface ImageFormData {
  uri: string
  type: string
  name: string
}

export interface Reaction {}
export interface Comment {
  content: string
  authorAvatar: string
  authorId: number
  authorName: string
  postId: number
}
