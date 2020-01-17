import {
  NewFeedState,
  NewFeedAction,
  LOAD_NEWFEED_SUCCESS,
  LOAD_NEWFEED_PROGRESS,
  LOAD_NEWFEED_FAIL,
} from '../types/newfeed.types'

let initialState: NewFeedState = {
  isLoadingNewFeed: false,
}

export default (
  state: NewFeedState = initialState,
  action: NewFeedAction,
): NewFeedState => {
  switch (action.type) {
    case LOAD_NEWFEED_PROGRESS:
      return {
        ...state,
        isLoadingNewFeed: true,
      }
    case LOAD_NEWFEED_SUCCESS:
      return {
        ...state,
        isLoadingNewFeed: false,
        currentNewFeed: action.newfeeds,
      }
    case LOAD_NEWFEED_FAIL:
      return {
        ...state,
        isLoadingNewFeed: false,
      }
    default:
      return state
  }
}
