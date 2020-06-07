import React, { useEffect } from 'react'
import { Post } from '../Shared/components/Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import * as Actions from '../../redux/action-creators/post'

export const PostContainer = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(Actions.getPostById(id))
  }, [])

  const { post } = useSelector(state => state.postReducer)

  if (!post) {
    return null
  }

  return <Post post={post} postId={id} />
}
