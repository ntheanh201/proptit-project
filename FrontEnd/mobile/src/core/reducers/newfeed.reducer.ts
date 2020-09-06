import {
  NewsfeedState,
  NewsfeedAction,
  LOAD_NEWSFEED_SUCCESS,
  LOAD_NEWSFEED_PROGRESS,
  LOAD_NEWSFEED_FAIL,
  UPDATE_NEWSFEED_PROGRESS,
  UPDATE_NEWSFEED_SUCCESS,
  UPDATE_NEWSFEED_FAILED,
} from '../types/newfeed.types'

let initialState: NewsfeedState = {
  isLoadingNewsfeed: false,
  isUpdatingNewsfeed: false,
  currentNewsfeed: [],
}

export default (
  state: NewsfeedState = initialState,
  action: NewsfeedAction,
): NewsfeedState => {
  switch (action.type) {
    case LOAD_NEWSFEED_PROGRESS:
      return {
        ...state,
        isLoadingNewsfeed: true,
      }
    case LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
        isLoadingNewsfeed: false,
        currentNewsfeed: action.newsfeed!,
      }
    case LOAD_NEWSFEED_FAIL:
      return {
        ...state,
        isLoadingNewsfeed: false,
      }
    case UPDATE_NEWSFEED_PROGRESS:
      return {
        ...state,
        isUpdatingNewsfeed: true,
      }
    case UPDATE_NEWSFEED_SUCCESS:
      return {
        ...state,
        isUpdatingNewsfeed: false,
        currentNewsfeed: action.newsfeed!,
      }
    case UPDATE_NEWSFEED_FAILED:
      return {
        ...state,
        isUpdatingNewsfeed: false,
      }
    default:
      return state
  }
}
