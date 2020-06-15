import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from 'tabler-react'

import { Icon, Card } from 'ui'

import * as postActions from '../../../../redux/action-creators/post'
import * as reactionActions from '../../../../redux/action-creators/reaction'

import { EditPostModal } from './components/EditPostModal'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { TickPoll } from './components/TickPoll/TickPoll'

export const Post = ({
  post,
  postId,
  cursor = false,
  commentVisible: showComment = false
}) => {
  //todo: comment
  const {
    id,
    authorName,
    groupId,
    authorAvatar,
    groupName,
    content,
    authorId,
    reactionNumber,
    commentNumber,
    type,
    photos,
    listPoll,
    time
  } = post

  const [redHeartVisible, setRedHeartVisible] = useState(
    post?.reactionId === -1 ? false : true
  )
  const [reactNumber, setReactNumber] = useState(reactionNumber)
  const [commentVisible, setCommentVisible] = useState(showComment)
  const [menuVisible, setMenuVisible] = useState(false)
  const [editPostVisible, setEditPostVisible] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  moment.locale('vi')

  const onEditPost = () => {
    setEditPostVisible(true)
    setMenuVisible(false)
  }

  const onDeletePost = () => {
    dispatch(postActions.deletePost(id))
    setMenuVisible(false)
  }

  const onClickPost = () => {
    cursor && history.push(`/post/${id || postId}`)
  }

  const onReactPost = () => {
    dispatch(reactionActions.reactPost(id))
    setRedHeartVisible(true)
    setReactNumber(reactNumber + 1)
  }

  const onDeleteReactionPost = () => {
    dispatch(reactionActions.deleteReaction(post?.reactionId))
    setRedHeartVisible(false)
    setReactNumber(reactNumber - 1)
  }

  const onClickReaction = () => {
    redHeartVisible ? onDeleteReactionPost() : onReactPost()
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
              cursor={cursor}
              className='d-flex flex-column pt-5 pb-5'
              onClick={onClickPost}
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
                <Icon
                  className={redHeartVisible && 'red-heart'}
                  onClick={onClickReaction}
                  prefix='fe'
                  name={'heart'}
                />{' '}
                {/* onClick={() => this.setState({fade: true})} */}
                {/* onAnimationEnd={() => this.setState({fade: false})} */}
                {reactNumber}
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

        {commentNumber > 0 && commentVisible && (
          <CardFooter>
            <Comment.List>
              {comments.map(({ name, date, text, avatarURL }) => (
                <Comment
                  avatarURL={avatarURL}
                  name={name}
                  date={date}
                  text={text}
                />
              ))}
            </Comment.List>
          </CardFooter>
        )}
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
  cursor: ${props => (!!props.cursor ? 'pointer' : 'auto')};
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
