import {
  PostsState,
  PostsAction,
  LOAD_NEWSFEED_SUCCESS,
  LOAD_POSTS_PROGRESS,
  LOAD_POSTS_FAIL,
  UPDATE_POSTS_PROGRESS,
  UPDATE_NEWSFEED_SUCCESS,
  UPDATE_POSTS_FAILED,
  UPDATE_GROUPPOSTS_SUCCESS,
  LOAD_GROUPPOSTS_SUCCESS,
  POST_POST_PROGRESS,
  POST_POST_SUCCESS,
  POST_POST_FAILED,
} from '../types/post.types'

let initialState: PostsState = {
  isLoadingPosts: false,
  isUpdatingPosts: false,
  isPostingPost: false,
  postingSuccess: false,
  currentNewsfeed: { count: 0, results: [] },
  groupPosts: { count: 0, results: [] },
}

export default (
  state: PostsState = initialState,
  action: PostsAction,
): PostsState => {
  switch (action.type) {
    case LOAD_POSTS_PROGRESS:
      return {
        ...state,
        isLoadingPosts: true,
      }
    case LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
        isLoadingPosts: false,
        currentNewsfeed: action.newsfeed!,
      }
    case LOAD_GROUPPOSTS_SUCCESS:
      return {
        ...state,
        isLoadingPosts: false,
        groupPosts: action.groupPosts!,
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        isLoadingPosts: false,
      }
    case UPDATE_POSTS_PROGRESS:
      return {
        ...state,
        isUpdatingPosts: true,
        postingSuccess: false,
      }
    case UPDATE_NEWSFEED_SUCCESS:
      return {
        ...state,
        isUpdatingPosts: false,
        postingSuccess: true,
        currentNewsfeed: action.newsfeed!,
      }
    case UPDATE_GROUPPOSTS_SUCCESS:
      return {
        ...state,
        isUpdatingPosts: false,
        postingSuccess: true,
        groupPosts: action.groupPosts!,
      }
    case UPDATE_POSTS_FAILED:
      return {
        ...state,
        isUpdatingPosts: false,
        postingSuccess: false,
      }
    case POST_POST_PROGRESS:
      return {
        ...state,
        isPostingPost: true,
        postingSuccess: false,
      }
    case POST_POST_SUCCESS:
      return {
        ...state,
        isPostingPost: false,
        postingSuccess: true,
      }
    case POST_POST_FAILED:
      return {
        ...state,
        isPostingPost: false,
        postingSuccess: false,
      }
    default:
      return state
  }
}
