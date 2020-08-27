import * as Actions from '../action-types'

import { addReactionService, deleteReactionService } from 'services'

export const reactPost = (postId, type) => {
  return async dispatch => {
    // eslint-disable-next-line new-cap
    const payload = await addReactionService(postId, type)
    if (payload) {
      dispatch({
        type: Actions.ADD_REACTION_SUCCESS,
        payload
      })
    } else {
      dispatch({
        type: Actions.ADD_REACTION_FAIL,
        payload: `Can't react to this post`
      })
    }
  }
}

export const deleteReaction = reactionId => {
  return async dispatch => {
    // eslint-disable-next-line new-cap
    const payload = await deleteReactionService(reactionId)
    if (payload) {
      dispatch({
        type: Actions.REMOVE_REACTION_SUCCESS,
        payload
      })
    } else {
      dispatch({
        type: Actions.REMOVE_REACTION_FAIL,
        payload: `Can't remove reaction of this post`
      })
    }
  }
}
