import React from 'react'

import CreateGroup from './CreateGroup'
import TaskManager from './TaskManager'

import './../styles/ManagerGroup.css'

const ManageGroup = (props) => {
  const listGroupAd = props.groupAdmin.map((groups) => (
    <TaskManager
      key={groups.id}
      inIDGroup={props.inIDGroup}
      groups={groups}
      inGroupTrue={props.inGroupTrue}
    />
  ))
  const listGroupMem = props.groupMember.map((groups) => (
    <TaskManager
      key={groups.id}
      inIDGroup={props.inIDGroup}
      groups={groups}
      inGroupTrue={props.inGroupTrue}
    />
  ))
  return (
    <div className='card col-lg-4 col-sm-12 col-md-12'>
      <div className='card-body'>
        <CreateGroup onGetCreate={props.onGetCreate} />
        <p className='card-text'>Nhóm bạn quản lý</p>
        {listGroupAd}
        <p className='card-text'>Nhóm của bạn</p>
        {listGroupMem}
      </div>
    </div>
  )
}

export default ManageGroup
