import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { LoadingIndicator } from 'ui'

import { Post } from '../Post/Post'
import { CreatePost } from '../Post/components/CreatePost'
import * as PostActions from '../../../../redux/action-creators/post'

const ShowCreatePost = ({ children }) => {
  const { isLogged } = useSelector(state => state.homeReducer)
  return isLogged ? (
    <>
      <CreatePost />
      {children}
    </>
  ) : (
    <>{children}</>
  )
}

export const Posts = ({ groupId = 1 }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PostActions.getAllPosts(groupId))
  }, [])

  const { posts } = useSelector(state => state.postReducer)

  const onCreatePoll = (poll, postId) => {
    posts[postId - 1].listPoll.push(poll)
  }

  if (!posts) {
    return <LoadingIndicator />
  }

  return (
    <ShowCreatePost>
      <Title>Bảng tin</Title>
      {posts &&
        posts.map((post, index) => (
          <Post key={index} post={post} onCreatePoll={onCreatePoll} cursor />
        ))}
    </ShowCreatePost>
  )
}

const Title = styled.h1``
