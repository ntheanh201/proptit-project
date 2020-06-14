import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'tabler-react'
import { useState } from 'core'
import { Card, CardBody, Icon, CardFooter } from 'ui'

import * as Actions from '../../../../../redux/action-creators/post'

const PostInput = ({ isEdit = false, groupId, post, setEditPostVisible }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.homeReducer)
  const [content, setContent] = useState((isEdit && post.content) || null)
  const [type, setType] = useState((isEdit && post.type) || 0)
  const onChangeValue = event => {
    setContent(event.target.value)
  }

  const onCreatePost = () => {
    dispatch(
      Actions.createPost({
        content,
        type,
        authorId: user.id,
        groupId
      })
    )
  }

  const onEditPost = () => {
    dispatch(
      Actions.updatePost({
        ...post,
        content,
        type,
        authorId: user.id,
        groupId
      })
    )
    setEditPostVisible(false)
  }
  return (
    <>
      <Form.Textarea
        rows={3}
        placeholder='Bạn đang nghĩ gì?'
        onChange={onChangeValue}
        value={content}
      />
      <Bottom>
        <div className='icon d-none d-md-inline-block ml-3'>
          <Icon prefix='fa' name={'file-picture-o'} />
        </div>
        <div className='icon d-none d-md-inline-block ml-3'>
          <Icon prefix='fa' name={'list-ul'} onClick={() => setType(1)} />
        </div>
        <div className='icon d-none d-md-inline-block ml-3'>
          <Icon prefix='fa' name={'smile'} />
        </div>
      </Bottom>
      <CardFooter>
        <div className='text-right'>
          <Button
            type='submit'
            color='primary'
            onClick={isEdit ? onEditPost : onCreatePost}
          >
            {isEdit ? 'Sửa bài' : 'Đăng bài'}
          </Button>
        </div>
      </CardFooter>
    </>
  )
}

export const CreatePost = ({
  groupId = 1,
  post = null,
  isEdit = false,
  setEditPostVisible
}) => {
  return isEdit ? (
    <PostInput
      isEdit
      post={post}
      groupId={groupId}
      setEditPostVisible={setEditPostVisible}
    />
  ) : (
    <Card statusColor='blue'>
      <CardBody>
        <PostInput groupId={groupId} />
      </CardBody>
    </Card>
  )
}

const Bottom = styled.div``
