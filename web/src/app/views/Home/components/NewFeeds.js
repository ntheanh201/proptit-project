import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import { Grid } from 'tabler-react'
import { Card, CardTitle, CardHeader, CardBody } from 'ui'

import { Post } from '../../Shared/components/Post/Post'
import { CreatePost } from '../../Shared/components/Post/CreatePost'

const ShowNewFeeds = ({ children, onCreatePost }) => {
  const { isLogged } = useSelector((state) => state.homeReducer)
  return isLogged ? (
    <Grid.Col lg={8}>
      <CreatePost onCreatePost={onCreatePost} />
      {children}
    </Grid.Col>
  ) : (
    <Grid.Col>{children}</Grid.Col>
  )
}

export const NewFeeds = ({ posts, onCreatePost, onCreatePoll }) => {
  return (
    <ShowNewFeeds onCreatePost={onCreatePost}>
      <Card statusColor='blue'>
        <CardHeader>
          <CardTitle>Bảng tin</CardTitle>
        </CardHeader>
        <CardBody>
          {posts.map(
            ({
              id,
              name,
              username,
              content,
              time,
              img,
              userId,
              avatarImg,
              comments,
              likeCount,
              commentCount,
              type,
              listPoll
            }) => (
              <Post
                id={id}
                img={img}
                imgAlt={'Post'}
                postHref={'#'}
                content={content}
                username={'@' + username}
                profileHref={`/#/profile/${userId}`}
                name={name}
                avatarImg={avatarImg}
                time={time}
                comments={comments}
                likeCount={likeCount}
                commentCount={commentCount}
                type={type}
                listPoll={listPoll}
                onCreatePoll={onCreatePoll}
              />
            )
          )}
        </CardBody>
      </Card>
    </ShowNewFeeds>
  )
}
