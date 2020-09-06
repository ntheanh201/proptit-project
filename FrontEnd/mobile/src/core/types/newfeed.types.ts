import { Action } from 'redux'
import { User } from './user.types'
import { Group } from './group.types'

export const LOAD_NEWSFEED_SUCCESS = 'LOAD_NEWSFEED_SUCCESS'
export const LOAD_NEWSFEED_PROGRESS = 'LOAD_NEWSFEED_PROGRESS'
export const LOAD_NEWSFEED_FAIL = 'LOAD_NEWSFEED_FAIL'
export const UPDATE_NEWSFEED_PROGRESS = 'UPDATE_NEWSFEED_PROGRESS'
export const UPDATE_NEWSFEED_SUCCESS = 'UPDATE_NEWSFEED_SUCCESS'
export const UPDATE_NEWSFEED_FAILED = 'UPDATE_NEWSFEED_FAILED'

export interface NewsfeedState {
  isLoadingNewsfeed: boolean
  isUpdatingNewsfeed: boolean
  currentNewsfeed: Post[]
}

export interface NewsfeedAction extends Action<string> {
  newsfeed?: Post[]
}

export interface Post {
  id: number
  assignedUser: Pick<User, 'id' | 'avatar' | 'displayName'>
  assignedGroup: Pick<Group, 'id' | 'name' | 'cover' | 'isAdmin'>
  content: string
  reactionNumber?: number
  commentNumber?: number
  time: Date
  type: Number
  photos: PostPhoto[]
  polls: Poll[]
  reactionId?: number
  reactions: Reaction[]
  comments?: Comment[]
}

export interface PostPhoto {
  id: number
  imgUrl: string
}

export interface ImageFormData {
  uri: string
  type: string
  name: string
}

export interface Reaction {
  id: number
  type: number
  assignedUser: Pick<User, 'id' | 'avatar' | 'displayName'>
}

export interface Comment {
  content: string
  assignedUser: Pick<User, 'id' | 'avatar' | 'displayName'>
  postId: number
}

export interface Poll {
  id: number
  question: string
  ticks: Tick[]
}

export interface Tick {
  id: number
  assignedUser: Pick<User, 'id' | 'avatar' | 'displayName'>
}
