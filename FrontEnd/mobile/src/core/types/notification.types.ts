import { User } from './user.types'
import { Post } from './newfeed.types'

export interface Notification {
  assignedPost: Pick<Post, 'id' | 'assignedGroupId' | 'assignedGroupName'>
  type: number
  assignedUser: Pick<User, 'avatar' | 'id' | 'displayName'>
  createdTime: number
}
