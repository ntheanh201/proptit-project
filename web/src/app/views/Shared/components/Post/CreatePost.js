import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'tabler-react'

import * as Actions from '../../../../redux/action-creators/post'
import { useState } from 'core'
import { Card, CardHeader, CardBody, CardTitle, Icon } from 'ui'

import img from '../../../../assets/imgChucTet.jpg'
import ngocmai from '../../../../assets/ngocmai.jpg'

export const CreatePost = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.postReducer)
  const [state, setState] = useState({ value: '' })

  const onChangeValue = (event) => {
    setState({ value: event.target.value })
  }

  const [groups, setGroups] = useState([
    {
      url: 'http://apis.aiforce.xyz/groups/1/',
      id: 1,
      name: 'D17',
      description: 'Khóa D17 CLB Lập trình',
      members: [
        {
          avatar:
            'http://apis.aiforce.xyz/media/7514383c-0273-4715-834b-260c1bf542a7.png',
          url: 'http://apis.aiforce.xyz/auth/users/1/',
          id: 1,
          username: 'proptit',
          displayName: 'Nguyen The Anh',
          phoneNumber: '0123456789',
          facebook: 'https://www.facebook.com/ntheanh201',
          role: 0,
          dateOfBirth: '1999-02-03T13:35:56Z',
          description:
            'Ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat',
          email: 'ntanh311@gmail.com',
          participatingGroup: [
            {
              id: 1
            }
          ]
        },
        {
          avatar:
            'http://apis.aiforce.xyz/media/c0ded396-2777-46aa-a064-3bf316bc6598png',
          url: 'http://apis.aiforce.xyz/auth/users/2/',
          id: 2,
          username: 'hanhnguyenduc999',
          displayName: null,
          phoneNumber: null,
          facebook: null,
          role: 0,
          dateOfBirth: null,
          description: null,
          email: '',
          participatingGroup: [
            {
              id: 1
            }
          ]
        }
      ],
      admins: [
        {
          avatar:
            'http://apis.aiforce.xyz/media/7514383c-0273-4715-834b-260c1bf542a7.png',
          url: 'http://apis.aiforce.xyz/auth/users/1/',
          id: 1,
          username: 'proptit',
          displayName: 'Nguyen The Anh',
          phoneNumber: '0123456789',
          facebook: 'https://www.facebook.com/ntheanh201',
          role: 0,
          dateOfBirth: '1999-02-03T13:35:56Z',
          description:
            'Ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat',
          email: 'ntanh311@gmail.com',
          participatingGroup: [
            {
              id: 1
            }
          ]
        }
      ]
    }
  ])
  //todo: get all groups

  const onCreatePost = (post) => {
    //todo: createPost, update redux
    dispatch(
      // eslint-disable-next-line camelcase
      Actions.createPost([{ ...post, assigned_user_avatar: ngocmai }, ...posts])
    )
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
          />
        </Form.Group>
        <Bottom>
          <div className='icon d-none d-md-inline-block ml-3'>
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
