import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid } from 'tabler-react'
import { Card, CardTitle, CardHeader, CardBody, LoadingIndicator } from 'ui'

import { Post } from '../Post/Post'
import { CreatePost } from '../Post/components/CreatePost'
import * as PostActions from '../../../../redux/action-creators/post'

const ShowCreatePost = ({ children }) => {
  const { isLogged } = useSelector(state => state.homeReducer)
  return isLogged ? (
    <Grid.Col lg={8}>
      <CreatePost />
      {children}
    </Grid.Col>
  ) : (
    <Grid.Col>{children}</Grid.Col>
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
      <Card statusColor='blue'>
        <CardHeader>
          <CardTitle>Bảng tin</CardTitle>
        </CardHeader>
        <CardBody>
          {posts &&
            posts.map((post, index) => (
              <Post key={index} post={post} onCreatePoll={onCreatePoll} />
            ))}
        </CardBody>
      </Card>
    </ShowCreatePost>
  )
}
