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
    const posts = await newsfeedService.getAll()
    if (posts) {
      dispatch({ type: LOAD_NEWSFEED_SUCCESS, newsfeed: posts })
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
      const currentPosts: Post[] = JSON.parse(
        JSON.stringify(
          postData.assignedGroup.id === 1
            ? store.getState().post.currentNewsfeed
            : store.getState().post.groupPosts,
        ),
      )
      currentPosts.unshift(newPost)
      postData.assignedGroup.id === 1
        ? dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentPosts })
        : dispatch({
            type: UPDATE_GROUPPOSTS_SUCCESS,
            groupPosts: currentPosts,
          })
    } else {
      dispatch({ type: POST_POST_FAILED })
      Alert.alert('Check your Internet connection!')
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
      const currentNewsfeed: Post[] = JSON.parse(
        JSON.stringify(store.getState().post.currentNewsfeed),
      )
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.content = content
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Post[] = JSON.parse(
          JSON.stringify(store.getState().post.currentNewsfeed),
        )
        currentGroupPosts.forEach((post) => {
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
      Alert.alert('Check your Internet connection!')
    }
  }
}

export const deletePost = (postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const response = await postService.delete(postId)
    if (response === 'success') {
      let currentPosts: Post[] = JSON.parse(
        JSON.stringify(
          groupId === 1
            ? store.getState().post.currentNewsfeed
            : store.getState().post.groupPosts,
        ),
      )
      currentPosts = currentPosts.filter((post) => {
        return post.id !== postId
      })
      groupId === 1
        ? dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentPosts })
        : dispatch({
            type: UPDATE_GROUPPOSTS_SUCCESS,
            groupPosts: currentPosts,
          })
      Alert.alert('Delete Successful')
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
      Alert.alert('Check your Internet connection!')
    }
  }
}

export const addReaction = (postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const reactionId = await reactionService.addReaction(postId)
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    if (reactionId) {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber += 1
          post.reactionId = reactionId
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Post[] = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.forEach((post) => {
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
      Alert.alert('Check your Internet connection!')
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
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    if (response === 'success') {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.reactionNumber -= 1
          post.reactionId = -1
        }
      })
      dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
      if (groupId !== 1) {
        const currentGroupPosts: Post[] = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.forEach((post) => {
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
      Alert.alert('Check your Internet connection!')
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
    const currentNewsfeed: Post[] = JSON.parse(
      JSON.stringify(store.getState().post.currentNewsfeed),
    )
    dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentNewsfeed })
    if (response === 'success') {
      currentNewsfeed.forEach((post) => {
        if (post.id === postId) {
          post.commentNumber += 1
        }
      })
      if (groupId !== 1) {
        const currentGroupPosts: Post[] = JSON.parse(
          JSON.stringify(store.getState().post.groupPosts),
        )
        currentGroupPosts.forEach((post) => {
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
      Alert.alert('Check your Internet connection!')
    }
  }
}

export const addTick = (pollId: number, postId: number, groupId: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: UPDATE_POSTS_PROGRESS })
    const data = await tickService.addTick(pollId)
    const currentPosts: Post[] = JSON.parse(
      JSON.stringify(
        groupId === 1
          ? store.getState().post.currentNewsfeed
          : store.getState().post.groupPosts,
      ),
    )
    const currentUser: User = JSON.parse(
      JSON.stringify(store.getState().signin.currentUser),
    )
    if (data) {
      currentPosts.forEach((post) => {
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
      groupId === 1
        ? dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentPosts })
        : dispatch({
            type: UPDATE_GROUPPOSTS_SUCCESS,
            groupPosts: currentPosts,
          })
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
      Alert.alert('Check your Internet connection!')
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
    const currentPosts: Post[] = JSON.parse(
      JSON.stringify(
        groupId === 1
          ? store.getState().post.currentNewsfeed
          : store.getState().post.groupPosts,
      ),
    )
    if (response === 'success') {
      currentPosts.forEach((post) => {
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
      groupId === 1
        ? dispatch({ type: UPDATE_NEWSFEED_SUCCESS, newsfeed: currentPosts })
        : dispatch({
            type: UPDATE_GROUPPOSTS_SUCCESS,
            groupPosts: currentPosts,
          })
    } else {
      dispatch({ type: UPDATE_POSTS_FAILED })
      Alert.alert('Check your Internet connection!')
    }
  }
}
