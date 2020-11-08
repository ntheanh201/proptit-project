import { MiniUser } from './user.types'

export interface Target {
  id: number
  assignedUser: MiniUser
  name: string
  isDone: boolean
  point: Point
  status: number
  createdTime: Date
}

export interface Point {
  id: number
  score: number
  description: string
}
