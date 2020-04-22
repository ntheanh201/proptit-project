import React, { useContext } from 'react'
import styled from 'styled-components'

import { Comment } from 'tabler-react'

import { Icon, Card, TickPoll } from 'ui'

export const Post = (props) => {
  const { post, onCreatePoll } = props

  const {
    id,
    assigned_user_display_name: name,
    content,
    img,
    assigned_user_id: userId,
    profileHref = '',
    username = '',
    assigned_user_avatar: avatarImg,
    reaction_number: reactionCount,
    commentCount,
    type,
    listPoll
  } = post

  return (
    <Card key={id}>
      <div className='d-flex pt-5 mt-auto pl-5'>
        <div className='avatar avatar-md mr-3' style={{ overflow: 'hidden' }}>
          <img src={avatarImg} />
        </div>
        <div>
          <a href={profileHref} className='text-default'>
            {name}
          </a>
          <small className='d-block text-muted'>
            <strong>{username}</strong>
          </small>
          <div className='d-flex flex-column pt-5 pb-5'>
            <Span>{content}</Span>
          </div>

          <div className='tickPoll'>
            {type === 1 && (
              <TickPoll
                onCreatePoll={onCreatePoll}
                listPoll={listPoll}
                postId={id}
              />
            )}
          </div>
          <div>
            {type === 0 && (
              <ImageWrapper>
                <Img className='card-img-top' src={img} alt={username} />
              </ImageWrapper>
            )}
          </div>

          <CardBottom className='d-flex ml-auto text-muted pt-2 pb-5'>
            <div className='icon d-none d-md-inline-block ml-3'>
              <Icon prefix='fe' name={'heart'} /> {reactionCount}
            </div>
            <div className='icon d-none d-md-inline-block ml-3'>
              <Icon prefix='fa' name={'comment-o'} /> {commentCount}
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

const Img = styled.img`
  max-width: 550px;
  max-height: 550px;
`

const ImageWrapper = styled.div`
  margin: auto;
`

const CardBottom = styled.div`
  justify-content: space-evenly;
`
