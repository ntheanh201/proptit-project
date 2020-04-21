import React, { useContext } from 'react'
import styled from 'styled-components'
import { Form, Button } from 'tabler-react'

import { useState } from 'core'

import { Card, CardHeader, CardBody, CardTitle, Icon } from 'ui'
import { HomeContext } from '../HomeContainer'

import img from '../../../assets/imgChucTet.jpg'

export const CreatePost = () => {
  const { onCreatePost } = useContext(HomeContext)

  const [state, setState] = useState({ value: '' })

  const onChangeValue = (event) => {
    setState({ value: event.target.value })
  }

  return (
    <Card statusColor='blue'>
      <CardHeader>
        <CardTitle>Trang chủ</CardTitle>
      </CardHeader>
      <CardBody>
        <Form.Group className='mb=0'>
          <Form.Textarea
            rows={3}
            placeholder='Bạn đang nghĩ gì?'
            onChange={onChangeValue}
          ></Form.Textarea>
        </Form.Group>
        <Bottom>
          <div className='icon d-none d-md-inline-block ml-3' onClick={}>
            <Icon prefix='fa' name={'file-picture-o'} />
          </div>
          <div className='icon d-none d-md-inline-block ml-3'>
            <Icon prefix='fa' name={'list-ul'} />
          </div>
          <div className='icon d-none d-md-inline-block ml-3'>
            <Icon prefix='fa' name={'smile'} />
          </div>
          <div className='text-right'>
            <Button
              type='submit'
              color='primary'
              onClick={() =>
                onCreatePost({
                  content: state.value,
                  name: 'Bùi Phương Ngọc Mai',
                  username: 'ngocmai.buiphuong',
                  img
                })
              }
            >
              Đăng bài
            </Button>
          </div>
        </Bottom>
      </CardBody>
    </Card>
  )
}

const Bottom = styled.div``
