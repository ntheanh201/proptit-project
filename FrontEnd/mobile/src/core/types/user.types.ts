import { Group } from './group.types'

export interface User {
  id?: number
  username?: string
  displayName?: string
  avatar?: string
  cover?: string
  gender?: number
  className?: string
  dateOfBirth?: string
  description?: string
  email?: string
  facebook?: string
  phoneNumber?: string
  regDate?: Date
  participatingGroup?: Pick<Group, 'cover' | 'id' | 'isAdmin' | 'name'>[]
}
