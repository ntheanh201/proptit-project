export interface ItemTickPoll {
    id: string
    content: string
    vote: number
    listVote: string[]
}

export interface TickPoll {
    id: string
    sumVote: number
    listPoll: ItemTickPoll[]
}