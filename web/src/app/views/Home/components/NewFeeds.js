import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid } from 'tabler-react'
import { Card, CardTitle, CardHeader, CardBody, LoadingIndicator } from 'ui'

import { Post } from '../../Shared/components/Post/Post'
import { CreatePost } from '../../Shared/components/Post/CreatePost'

const ShowNewFeeds = ({ children }) => {
  const { isLogged } = useSelector((state) => state.homeReducer)
  return isLogged ? (
    <Grid.Col lg={8}>
      <CreatePost />
      {children}
    </Grid.Col>
  ) : (
    <Grid.Col>{children}</Grid.Col>
  )
}

export const NewFeeds = () => {
  const { posts } = useSelector((state) => state.postReducer)
  const onCreatePoll = (poll, postId) => {
    posts[postId - 1].listPoll.push(poll)
  }

  if (!posts) {
    return <LoadingIndicator />
  }

  return (
    <ShowNewFeeds>
      <Card statusColor='blue'>
        <CardHeader>
          <CardTitle>Bảng tin</CardTitle>
        </CardHeader>
        <CardBody>
          {posts &&
            posts.map((post) => (
              <Post post={post} onCreatePoll={onCreatePoll} />
            ))}
        </CardBody>
      </Card>
    </ShowNewFeeds>
  )
}
