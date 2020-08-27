import React, { useState } from 'react'

import './../styles/CreatingGroup.css'
import './../styles/MyGroup.css'

import { MenuGroup } from './MenuGroup'

export const MyGroup = ({ isAdmin, name }) => {
  const [addMember, setAddMember] = useState(false)
  const addMemberTo = () => {
    setAddMember(!addMember)
  }

  const show = addMember && (
    <input
      type='text'
      className='form-control add-mem'
      name='member'
      placeholder='Chọn thành viên'
    />
  )

  return (
    <div className='card card2 col-lg-7 col-sm-12 col-md-12 p-lg-5 p-sm-5 p-md-5 p-5'>
      <div className='image-cover'>
        <button
          type='button'
          name=''
          className='btn btn-block btn-change'
          disabled={!isAdmin}
        >
          <i className='fa fa-camera' />
          Chỉnh sửa
        </button>
      </div>
      <h2>{name}</h2>
      <small className='amount'>14k thành viên</small>
      <div className='flex-container'>
        <button
          type='button'
          name=''
          className='btn btn-block btn-add'
          disabled={!isAdmin}
          onClick={addMemberTo}
        >
          <i className='fa fa-plus' />
          Mời
        </button>
        {show}
        <div className='me'></div>
        <div className='number-member'>+34</div>
      </div>
      {/* <MenuGroup setGroup={props.setGroup} getGroup={props.getGroup} /> */}
    </div>
  )
}
