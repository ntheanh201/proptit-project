import { User } from './user.types'
import { Post } from './newfeed.types'
import { Group } from './group.types'

export interface Notification {
  assignedPost: Pick<Post, 'id'>
  type: number
  assignedUser: Pick<User, 'avatar' | 'id' | 'displayName'>
  assignedGroup: Pick<Group, 'id' | 'name' | 'cover' | 'isAdmin'>
  createdTime: number
}
