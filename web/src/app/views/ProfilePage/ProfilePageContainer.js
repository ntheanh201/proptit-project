import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'core'

import { ProfilePage } from './ProfilePage'

import cover from './assets/cover.jpg'
import avt from './assets/avt.jpg'

export const ProfilePageContainer = () => {
  const { user } = useSelector((state) => state.homeReducer)
  // const {
  //   id,
  //   username,
  //   displayName,
  //   avatar,
  //   dateOfBirth,
  //   description,
  //   className,
  //   email,
  //   facebook,
  //   phoneNumber,
  //   regDate,
  //   gender
  // } = user
  const initialValues = {
    ...user,
    gender: '',
    grade: 'D18',
    address: '',
    quotes: '',
    position: 'Ban Sự kiện',
    facebook: '',
    missions: [
      {
        id: 1,
        content: 'Làm app Java',
        completed: false
      },
      {
        id: 2,
        content: 'Học tiếng Anh',
        completed: true
      }
    ],
    showMenu: 1 /*to show menu*/,
    generation: 6 /*thế hệ*/
  }
  const [state, setState] = useState(initialValues)
  const props = {
    state,
    setState
  }

  return <ProfilePage {...props} />
}
