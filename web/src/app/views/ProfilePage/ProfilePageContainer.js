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
    cover,
    editMission,
    editingMission,
    editInfo,
    idChoose
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
    missions: [],
    showMenu: 1, /*to show menu*/
    generation: 6, /*thế hệ*/
    showModal: false,
    editInfo: false, /*to show to edit inforamtion*/
    idChoose: []
  }
  const [state, setState] = useState(initialValues)
  const props = {
    state,
    setState
  }
  return <ProfilePage {...props} />
}
