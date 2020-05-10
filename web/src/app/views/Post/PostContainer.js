import React, { useEffect } from 'react'
import { Post } from '../Shared/components/Post/Post'
import { useDispatch, useSelector } from 'react-redux'

import * as Actions from '../../redux/action-creators/post'

export const PostContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const id = 1
    dispatch(Actions.getPostById(id))
  }, [])

  const { post } = useSelector((state) => state.postReducer)

  if (!post) {
    return null
  }

  return <Post post={post} />
}
