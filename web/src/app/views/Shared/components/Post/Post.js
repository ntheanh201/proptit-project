import React, { useContext } from 'react'
import styled from 'styled-components'

import { Comment } from 'tabler-react'

import { Icon, Card, TickPoll } from 'ui'
import { ImageViewer } from '../ImageViewer/ImageViewer'

export const Post = (props) => {
  const { post, onCreatePoll } = props

  const {
    id,
    authorName,
    groupId,
    authorAvatar,
    groupName,
    content,
    authorId,
    profileHref = '',
    username = '',
    avatarImg,
    reactionNumber,
    commentNumber,
    type,
    photos,
    listPoll,
    reactionId,
    time
  } = post

  return (
    <Card key={id}>
      <div className='d-flex pt-5 mt-auto pl-5'>
        <div className='avatar avatar-md mr-3' style={{ overflow: 'hidden' }}>
          <img src={authorAvatar} />
        </div>
        <div>
          <a href={profileHref} className='text-default'>
            {authorName}
          </a>
          <small className='d-block text-muted'>
            <strong>{username}</strong>
          </small>
          <div className='d-flex flex-column pt-5 pb-5'>
            <Span>{content}</Span>
          </div>

          {/*<div className='tickPoll'>*/}
          {/*  {type === 1 && (*/}
          {/*    <TickPoll*/}
          {/*      onCreatePoll={onCreatePoll}*/}
          {/*      listPoll={listPoll}*/}
          {/*      postId={id}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</div>*/}
          <div>
            <ImageWrapper>
              {photos.map((photo) => (
                <ImageViewer src={photo} alt={username} />
              ))}
            </ImageWrapper>
          </div>

          <CardBottom className='d-flex ml-auto text-muted pt-2 pb-5'>
            <div className='icon d-none d-md-inline-block ml-3'>
              <Icon prefix='fe' name={'heart'} /> {reactionNumber}
            </div>
            <div className='icon d-none d-md-inline-block ml-3'>
              <Icon prefix='fa' name={'comment-o'} /> {commentNumber}
            </div>
            <div className='icon d-none d-md-inline-block ml-3'>
              <Icon prefix='fe' name={'external-link'} />
            </div>
          </CardBottom>
        </div>
      </div>
      {/*{commentCount > 0 && (*/}
      {/*  <CardFooter>*/}
      {/*    <Comment.List>*/}
      {/*      {comments.map(({ name, date, text, avatarURL }) => (*/}
      {/*        <Comment*/}
      {/*          avatarURL={avatarURL}*/}
      {/*          name={name}*/}
      {/*          date={date}*/}
      {/*          text={text}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </Comment.List>*/}
      {/*  </CardFooter>*/}
      {/*)}*/}
    </Card>
  )
}

const Span = styled.span`
  max-width: 550px;
`

const ImageWrapper = styled.div`
  margin: auto;
`

const CardBottom = styled.div`
  justify-content: space-evenly;
`
