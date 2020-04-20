import { Dispatch } from 'redux'
import {
  LOAD_NEWFEED_SUCCESS,
  NewFeedAction,
  Post,
  LOAD_NEWFEED_FAIL,
  LOAD_NEWFEED_PROGRESS,
} from '../types/newfeed.types'
import { postService } from '../../services'
import { convertToPostType } from '../../configs/Function'

export const getNewfeeds = (groupId: string) => {
  return async (dispatch: Dispatch<NewFeedAction>) => {
    dispatch({ type: LOAD_NEWFEED_PROGRESS })
    const data = await postService.getAll()
    if (data) {
      const posts = convertToPostType(data)
      dispatch({ type: LOAD_NEWFEED_SUCCESS, newfeeds: posts })
    } else {
      dispatch({ type: LOAD_NEWFEED_FAIL })
    }
  }
}
