import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'core'

import { ProfilePage } from './ProfilePage'

import cover from './assets/cover.jpg'
import avt from './assets/avt.jpg'

export const ProfilePageContainer = () => {
  const { user } = useSelector((state) => state.homeReducer)
  const {
    id,
    display_name: displayName,
    username,
    date_of_birth: dateOfBrith,
    description,
    email,
    phone_number: phoneNumber
  } = user
  const initialValues = {
    displayName,
    username,
    avt,
    cover,
    dateOfBrith,
    phoneNumber,
    email,
    description,
    gender: '',
    grade: '',
    address: '',
    quotes: '',
    position: 'Ban Sự kiện',
    tab: false,
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
    ]
  }
  const [state, setState] = useState(initialValues)
  const props = {
    state,
    setState
  }

  return <ProfilePage {...props} />
}
