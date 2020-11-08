import { Dispatch } from 'redux'
import {
  LOAD_NEWSFEED_SUCCESS,
  PostsAction,
  Post,
  LOAD_POSTS_FAIL,
  LOAD_POSTS_PROGRESS,
  UPDATE_POSTS_PROGRESS,
  UPDATE_NEWSFEED_SUCCESS,
  UPDATE_POSTS_FAILED,
  UPDATE_GROUPPOSTS_SUCCESS,
  LOAD_GROUPPOSTS_SUCCESS,
  ImageFormData,
  Poll,
  POST_POST_PROGRESS,
  POST_POST_SUCCESS,
  POST_POST_FAILED,
  Newsfeed,
} from '../types/post.types'
import {
  postService,
  tickService,
  newsfeedService,
  reactionService,
  commentService,
} from '../../services'
import store from '../store'
import { User } from '../types'
import { Alert } from 'react-native'

export const getNewsFeed = () => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: LOAD_POSTS_PROGRESS })
    const newsfeed = await newsfeedService.getPagingNewsfeed()
    if (newsfeed) {
      dispatch({ type: LOAD_NEWSFEED_SUCCESS, newsfeed })
    } else {
      dispatch({ type: LOAD_POSTS_FAIL })
    }
  }
}

export const getGroupPosts = (groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: LOAD_POSTS_PROGRESS })
    const posts = await postService.getAllwParams('group', groupId)
    if (posts) {
      dispatch({ type: LOAD_GROUPPOSTS_SUCCESS, groupPosts: posts })
    } else {
      dispatch({ type: LOAD_POSTS_FAIL })
    }
  }
}

export const getMoreGroupPost = (groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: LOAD_POSTS_PROGRESS })
    const currentGroupPosts: Newsfeed = JSON.parse(
      JSON.stringify(
        groupId === 1
          ? store.getState().post.currentNewsfeed
          : store.getState().post.groupPosts,
      ),
    )
    if (currentGroupPosts.next) {
      const newGroupPosts = await newsfeedService.getPagingNewsfeed(
        currentGroupPosts.next,
      )
      if (newGroupPosts) {
        const currentPosts = currentGroupPosts.results
        newGroupPosts.results.unshift(...currentPosts)
        groupId === 1
          ? dispatch({ type: LOAD_NEWSFEED_SUCCESS, newsfeed: newGroupPosts })
          : dispatch({
              type: LOAD_GROUPPOSTS_SUCCESS,
              groupPosts: newGroupPosts,
            })
      } else {
        dispatch({ type: LOAD_POSTS_FAIL })
      }
    } else {
      dispatch({ type: LOAD_POSTS_FAIL })
    }
  }
}

export const addPost = (
  postData: Pick<Post, 'content' | 'assignedGroup' | 'type'>,
  images: ImageFormData[],
  polls: string[],
) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: POST_POST_PROGRESS })
    const newPost = await postService.addPost(postData, images, polls)
    if (newPost) {
      dispatch({ type: POST_POST_SUCCESS })
      dispatch({ type: UPDATE_POSTS_PROGRESS })
      if (postData.assignedGroup.id === 1) {
        const currentNewsfeed: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.currentNewsfeed),
        )
        currentNewsfeed.results.unshift(newPost)
        currentNewsfeed.count += 1
        dispatch({
          type: UPDATE_NEWSFEED_SUCCESS,
          newsfeed: currentNewsfeed,
        })
      } else {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.unshift(newPost)
        currentGroupPosts.count += 1
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: POST_POST_FAILED })
    }
  }
}

export const updatePost = (
  postId: number,
  groupId: number,
  content: string,
) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await postService.updatePost({
      id: postId,
      content,
    })
    if (response === 'success') {
      const currentNewsfeed: Newsfeed = JSON.parse(
        JSON.stringify(store.getState().post.currentNewsfeed),
      )
      currentNewsfeed.results.forEach((post) => {
        if (post.id === postId) {
          post.content = content
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.currentNewsfeed),
        )
        currentGroupPosts.results.forEach((post) => {
          if (post.id === postId) {
            post.content = content
          }
        })
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const deletePost = (postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await postService.delete(postId)
    if (response === 'success') {
      if (groupId === 1) {
        const currentNewsfeed: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.currentNewsfeed),
        )
        currentNewsfeed.results = currentNewsfeed.results.filter((post) => {
          return post.id !== postId
        })
        dispatch({
          type: UPDATE_NEWSFEED_SUCCESS,
          newsfeed: currentNewsfeed,
        })
      } else {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results = currentGroupPosts.results.filter((post) => {
          return post.id !== postId
        })
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
      Alert.alert('Delete Successful')
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const addReaction = (postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const reactionId = await reactionService.addReaction(postId)
    const currentNewsfeed: Newsfeed = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    if (reactionId) {
      currentNewsfeed.results.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber += 1
          post.reactionId = reactionId
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.forEach((post) => {
          if (post.id === postId) {
            post.reactionNumber += 1
            post.reactionId = reactionId
          }
        })
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const deleteReaction = (
  reactionId: number,
  postId: number,
  groupId: number,
) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await reactionService.delete(reactionId)
    const currentNewsfeed: Newsfeed = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    if (response === 'success') {
      currentNewsfeed.results.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber -= 1
          post.reactionId = -1
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.forEach((post) => {
          if (post.id === postId) {
            post.reactionNumber -= 1
            post.reactionId = -1
          }
        })
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const addComment = (
  content: string,
  postId: number,
  groupId: number,
) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await commentService.addComment(postId, content)
    const currentNewsfeed: Newsfeed = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    if (response === 'success') {
      currentNewsfeed.results.forEach((post) => {
        if (post.id === postId) {
          post.commentNumber += 1
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.forEach((post) => {
          if (post.id === postId) {
            post.commentNumber += 1
          }
        })
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const addTick = (pollId: number, postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const data = await tickService.addTick(pollId)
    const currentNewsfeed: Newsfeed = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    const currentUser: User = JSON.parse(
      JSON.stringify(store.getState().signin.currentUser),
    )
    if (data) {
      currentNewsfeed.results.forEach((post) => {
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
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.forEach((post) => {
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
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}

export const deleteTick = (
  pollId: number,
  tickId: number,
  postId: number,
  groupId: number,
) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await tickService.delete(tickId)
    const currentNewsfeed: Newsfeed = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    if (response === 'success') {
      currentNewsfeed.results.forEach((post) => {
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
      if (groupId !== 1) {
        const currentGroupPosts: Newsfeed = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.results.forEach((post) => {
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
        dispatch({
          type: UPDATE_GROUPPOSTS_SUCCESS,
          groupPosts: currentGroupPosts,
        })
      }
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
    }
  }
}
