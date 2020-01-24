import React from 'react'

import { useState } from 'core'

import { ProfilePage } from './ProfilePage'

import cover from './assets/cover.jpg'
import avt from './assets/avt.jpg'

export const ProfilePageContainer = () => {
  const initialValues = {
    name: 'Bùi Phương Ngọc Mai',
    username: 'ngocmai.buiphuong',
    avt,
    cover,
    dob: '19/12/2000',
    gender: 'Nữ',
    grade: 'D18',
    address: 'Ba Vì, Hà Nội',
    quotes: 'The best or nothing',
    position: 'Ban Sự kiện',
    tab: false,
    title: 'Profile Information',
    facebook: 'ngocmai.buiphuong',
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
    ]
  }
  const [state, setState] = useState(initialValues)
  const props = {
    state,
    setState
  }

  return <ProfilePage {...props} />
}
