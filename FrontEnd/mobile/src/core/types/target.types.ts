import { MiniUser } from './user.types'

export interface Target {
  id: number
  assignedUser: MiniUser
  name: string
  isDone: boolean
  point?: Point
  status: number
  createdTime: Date
  resultImage?: string
}

export interface Point {
  id: number
  score: number
  description: string
}

export interface Rank {
  score: number
  user: MiniUser
}
