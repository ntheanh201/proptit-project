import { Group } from './group.types'

export interface User {
  id: number
  username: string
  displayName: string
  avatar: string
  cover: string
  gender?: number
  role?: number
  className?: string
  dateOfBirth?: string
  description?: string
  email?: string
  facebook?: string
  phoneNumber?: string
  regDate?: Date
  participatingGroup?: Pick<Group, 'cover' | 'id' | 'isAdmin' | 'name'>[]
}

export type UserInfo = Pick<
  User,
  | 'displayName'
  | 'phoneNumber'
  | 'email'
  | 'facebook'
  | 'description'
  | 'dateOfBirth'
  | 'gender'
>

export type MiniUser = Pick<User, 'id' | 'avatar' | 'displayName'>
