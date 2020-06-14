import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from 'tabler-react'

import { Icon, Card } from 'ui'

import * as Actions from '../../../../redux/action-creators/post'

import { EditPostModal } from './components/EditPostModal'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { TickPoll } from './components/TickPoll/TickPoll'

export const Post = ({ post, postId }) => {
  //todo: comment, react post
  const [menuVisible, setMenuVisible] = useState(false)
  const [editPostVisible, setEditPostVisible] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  moment.locale('vi')

  const {
    id,
    authorName,
    groupId,
    authorAvatar,
    groupName,
    content,
    authorId,
    avatarImg,
    reactionNumber,
    commentNumber,
    type,
    photos,
    listPoll,
    reactionId,
    time
  } = post

  const onEditPost = () => {
    setEditPostVisible(true)
    setMenuVisible(false)
  }

  const onDeletePost = () => {
    dispatch(Actions.deletePost(id))
    setMenuVisible(false)
  }

  return (
    <>
      <Card>
        <div className='d-flex pt-5 mt-auto pl-5'>
          <Wrapper
            className='avatar avatar-md mr-3'
            style={{ overflow: 'hidden' }}
          >
            <img src={authorAvatar} />
          </Wrapper>
          <div>
            <CursorLink
              className='text-default'
              onClick={() => history.push(`/profile/${authorId}`)}
            >
              {authorName}
            </CursorLink>
            <small className='d-block text-muted'>
              <strong>{moment(time).fromNow()}</strong>
            </small>
            <PostWrapper
              className='d-flex flex-column pt-5 pb-5'
              onClick={() => history.push(`/post/${id || postId}`)}
            >
              <Span>{content}</Span>
            </PostWrapper>

            {type === 1 && (
              <div className='tickPoll'>
                {type === 1 && (
                  <TickPoll
                    // onCreatePoll={onCreatePoll}
                    // listPoll={listPoll}
                    postId={id}
                  />
                )}
              </div>
            )}
            {photos && (
              <div>
                <ImageWrapper>
                  {photos.map((photo, index) => (
                    <ImageViewer key={index} src={photo} />
                  ))}
                </ImageWrapper>
              </div>
            )}
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
          <ActionBar>
            <CursorLink onClick={() => setMenuVisible(!menuVisible)}>
              ...
            </CursorLink>
            {menuVisible && (
              <ActionMenu>
                <ActionList>
                  <ActionItem onClick={onEditPost}>Sửa bài viết</ActionItem>
                  <DeletePost onClick={onDeletePost}>Xóa bài viết</DeletePost>
                </ActionList>
              </ActionMenu>
            )}
          </ActionBar>
        </div>
        {/* todo {postId && show comments} */}

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
      <EditPostModal
        modalVisible={editPostVisible}
        post={post}
        setEditPostVisible={setEditPostVisible}
      />
    </>
  )
}

const Span = styled.span`
  max-width: 550px;
`

const Wrapper = styled.div`
  position: relative;
`

const ImageWrapper = styled.div`
  margin: auto;
`

const CardBottom = styled.div`
  justify-content: space-evenly;
`

const PostWrapper = styled.div`
  cursor: pointer;
`

const CursorLink = styled.span`
  cursor: pointer;
  position: relative;
`

const ActionBar = styled.div`
  position: absolute;
  right: 2%;
`

const ActionMenu = styled.div`
  position: absolute;
  width: 150px;
`
const ActionList = styled.ul`
  list-style: none;
  padding: 0;
`

const ActionItem = styled.li`
  cursor: pointer;
`
const DeletePost = styled(ActionItem)`
  color: red;
`
