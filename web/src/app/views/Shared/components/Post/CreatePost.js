import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'tabler-react'
import { useState } from 'core'
import { Card, CardBody, Icon } from 'ui'

import * as Actions from '../../../../redux/action-creators/post'

import img from '../../../../assets/imgChucTet.jpg'
import ngocmai from '../../../../assets/ngocmai.jpg'

export const CreatePost = ({ groupId = 1 }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.homeReducer)
  const [content, setContent] = useState(null)
  const [type, setType] = useState(0)

  const onChangeValue = event => {
    setContent(event.target.value)
  }

  const onCreatePost = () => {
    //todo: createPost, backend needs to response post
    dispatch(
      Actions.createPost({
        content,
        type,
        authorId: user.id,
        groupId
      })
    )
  }

  return (
    <Card statusColor='blue'>
      <CardBody>
        <Form.Group className='mb=0'>
          <Form.Textarea
            rows={3}
            placeholder='Bạn đang nghĩ gì?'
            onChange={onChangeValue}
          />
        </Form.Group>
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
          <div className='text-right'>
            <Button type='submit' color='primary' onClick={onCreatePost}>
              Đăng bài
            </Button>
          </div>
        </Bottom>
      </CardBody>
    </Card>
  )
}

const Bottom = styled.div``
