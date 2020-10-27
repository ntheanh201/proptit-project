import { Action } from 'redux'
import { User } from './user.types'
import { Group } from './group.types'

export const LOAD_NEWSFEED_SUCCESS = 'LOAD_NEWSFEED_SUCCESS'
export const LOAD_GROUPPOSTS_SUCCESS = 'LOAD_GROUPPOSTS_SUCCESS'
export const LOAD_POSTS_PROGRESS = 'LOAD_NEWSFEED_PROGRESS'
export const LOAD_POSTS_FAIL = 'LOAD_NEWSFEED_FAIL'

export const UPDATE_POSTS_PROGRESS = 'UPDATE_POSTS_PROGRESS'
export const UPDATE_NEWSFEED_SUCCESS = 'UPDATE_NEWSFEED_SUCCESS'
export const UPDATE_GROUPPOSTS_SUCCESS = 'UPDATE_GROUPPOSTS_SUCCESS'
export const UPDATE_POSTS_FAILED = 'UPDATE_POSTS_FAILED'

export const POST_POST_PROGRESS = 'POST_POST_PROGRESS'
export const POST_POST_SUCCESS = 'POST_POST_SUCCESS'
export const POST_POST_FAILED = 'POST_POST_FAILED'

export interface PostsState {
  isLoadingPosts: boolean
  isUpdatingPosts: boolean
  isPostingPost: boolean
  postingSuccess: boolean
  currentNewsfeed: Post[]
  groupPosts: Post[]
}

export interface PostsAction extends Action<string> {
  newsfeed?: Post[]
  groupPosts?: Post[]
}

export interface Post {
  id: number
  assignedUser: Pick<User, 'id' | 'avatar' | 'displayName'>
  assignedGroup: Pick<Group, 'id' | 'name' | 'cover' | 'isAdmin'>
  content: string
  reactionNumber: number
  commentNumber: number
  time: Date
  type: Number
  photos: PostPhoto[]
  polls: Poll[]
  reactionId: number
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
  id: number
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
