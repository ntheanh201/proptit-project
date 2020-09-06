import { Dispatch } from 'redux'
import {
  LOAD_NEWSFEED_SUCCESS,
  NewsfeedAction,
  Post,
  LOAD_NEWSFEED_FAIL,
  LOAD_NEWSFEED_PROGRESS,
  UPDATE_NEWSFEED_PROGRESS,
  UPDATE_NEWSFEED_SUCCESS,
  UPDATE_NEWSFEED_FAILED,
} from '../types/newfeed.types'
import {
  postService,
  tickService,
  newfeedService,
  reactionService,
} from '../../services'
import store from '../store'
import { User } from '../types'

export const getNewsFeed = () => {
  return async (dispatch: Dispatch<NewsfeedAction>) => {
    dispatch({ type: LOAD_NEWSFEED_PROGRESS })
    const data = await newfeedService.getAll()
    if (data) {
      dispatch({ type: LOAD_NEWSFEED_SUCCESS, newsfeed: data })
    } else {
      dispatch({ type: LOAD_NEWSFEED_FAIL })
    }
  }
}

export const addReactionNewsfeed = (postId: number) => {
  return async (dispatch: Dispatch<NewsfeedAction>) => {
    dispatch({ type: UPDATE_NEWSFEED_PROGRESS })
    const reactionId = await reactionService.addReaction(postId)
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().newfeed.currentNewsfeed),
    )
    const currentUser: User = JSON.parse(
      JSON.stringify(store.getState().signin.currentUser),
    )
    if (reactionId) {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber! += 1
          post.reactions.push({
            id: reactionId,
            type: 0,
            assignedUser: {
              id: currentUser.id,
              avatar: currentUser.avatar,
              displayName: currentUser.displayName,
            },
          })
        }
      })
      console.log(JSON.stringify(currentNewsfeed))
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    } else {
      dispatch({ type: UPDATE_NEWSFEED_FAILED })
    }
  }
}

export const deleteReactionNewsfeed = (reactionId: number, postId: number) => {
  return async (dispatch: Dispatch<NewsfeedAction>) => {
    dispatch({ type: UPDATE_NEWSFEED_PROGRESS })
    const response = await reactionService.delete(reactionId)
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().newfeed.currentNewsfeed),
    )
    if (response === 'success') {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber! -= 1
          post.reactions = post.reactions.filter((reaction) => {
            return reaction.id !== reactionId
          })
        }
      })
      console.log(JSON.stringify(currentNewsfeed))
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    } else {
      dispatch({ type: UPDATE_NEWSFEED_FAILED })
    }
  }
}

export const addTickNewsfeed = (pollId: number, postId: number) => {
  return async (dispatch: Dispatch<NewsfeedAction>) => {
    dispatch({ type: UPDATE_NEWSFEED_PROGRESS })
    const data = await tickService.addTick(pollId)
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().newfeed.currentNewsfeed),
    )
    const currentUser: User = JSON.parse(
      JSON.stringify(store.getState().signin.currentUser),
    )
    if (data) {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          return post.polls.forEach((poll) => {
            if (poll.id === pollId) {
              return poll.ticks.push({
                id: data.id,
                assignedUser: {
                  avatar: currentUser.avatar,
                  displayName: currentUser.displayName,
                  id: currentUser.id,
                },
              })
            }
          })
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    } else {
      dispatch({ type: UPDATE_NEWSFEED_FAILED })
    }
  }
}

export const deleteTickNewsfeed = (
  pollId: number,
  tickId: number,
  postId: number,
) => {
  return async (dispatch: Dispatch<NewsfeedAction>) => {
    dispatch({ type: UPDATE_NEWSFEED_PROGRESS })
    const response = await tickService.delete(tickId)
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().newfeed.currentNewsfeed),
    )
    if (response === 'success') {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.polls.forEach((poll) => {
            if (poll.id === pollId) {
              poll.ticks = poll.ticks.filter((tick) => {
                return tick.id !== tickId
              })
            }
          })
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    } else {
      dispatch({ type: UPDATE_NEWSFEED_FAILED })
    }
  }
}
