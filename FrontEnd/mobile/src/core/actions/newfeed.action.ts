import { Dispatch } from 'redux'
import {
  LOAD_NEWFEED_SUCCESS,
  NewFeedAction,
  Post,
  LOAD_NEWFEED_FAIL,
  LOAD_NEWFEED_PROGRESS,
} from '../types/newfeed.types'
import { postService } from '../../services'
import { convertPostsArray } from '../../configs/Function'

export const getNewfeeds = (groupId: number) => {
  return async (dispatch: Dispatch<NewFeedAction>) => {
    dispatch({ type: LOAD_NEWFEED_PROGRESS })
    const data = await postService.getAllwParams('group', groupId)
    if (data) {
      const posts = convertPostsArray(data)
      dispatch({ type: LOAD_NEWFEED_SUCCESS, newfeeds: posts })
    } else {
      dispatch({ type: LOAD_NEWFEED_FAIL })
    }
  }
}
