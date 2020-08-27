import React, { useState } from 'react'

import './../styles/ManagerGroup.css'
import './../styles/SettingGroup.css'

export const SettingGroup = props => {
  const [addAdmin, setAddAdmin] = useState(false)
  const addAdminTo = () => {
    setAddAdmin(!addAdmin)
  }

  var show = addAdmin ? (
    <input
      type='text'
      className='form-control add-admin'
      name='member'
      placeholder='Chọn thành viên'
    />
  ) : (
    <div></div>
  )

  return (
    <div className='card col-lg-4 col-sm-12 col-md-12'>
      <div className='card-body'>
        <div className='flex-setting'>
          <button
            type='button'
            name=''
            className='btn btn-block btn-admin'
            disabled={!props.getIsAdmin}
            onClick={addAdminTo}
          >
            <i className='fa fa-plus'></i>
            Thêm quản trị viên
          </button>
          {show}
          <label>Quản trị viên:</label>
          <div className='list-admin'>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
          </div>
          <label>Thành viên:</label>
          <div className='list-admin'>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
            <div className='admin'>
              <i className='fa fa-times kick-out'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
