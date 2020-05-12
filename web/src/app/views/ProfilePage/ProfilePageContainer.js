import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'core'
import cover1 from './assets/cover.jpg'
import avt1 from './assets/avt.jpg'
import { ProfilePage } from './ProfilePage'



export const ProfilePageContainer = () => {
  const { user } = useSelector((state) => state.homeReducer)
  const {
    id,
    username,
    displayName,
    avatar,
    dateOfBirth,
    description,
    className,
    email,
    facebook,
    phoneNumber,
    regDate,
    gender,
    showModal,
    showMenu,
    generation,
    avt,
    cover
  } = user
  const initialValues = {
    ...user,
    avt: avt1,
    cover: cover1,
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
        deadline: new Date(),
        completed: false
      },
      {
        id: 2,
        content: 'Học tiếng Anh',
        deadline: new Date(),
        completed: true
      },
      {
        id: 3,
        content: 'Học tiếng Anh',
        deadline: new Date('12:00 6/6/2020'),
        completed: false
      }
    ],
    showMenu: 1, /*to show menu*/
    generation: 6, /*thế hệ*/
    showModal: false
  }
  const [state, setState] = useState(initialValues)
  const props = {
    state,
    setState
  }
  return <ProfilePage {...props} />
}
