import React from 'react'

import CreateGroup from './CreateGroup'
import { TaskManager } from './TaskManager'

import './../styles/ManagerGroup.css'

export const ManageGroup = ({
  groupAdmin,
  groupMember,
  onGetCreate,
  inIDGroup,
  inGroupTrue
}) => {
  const listGroupAd = groupAdmin.map(groups => (
    <TaskManager
      key={groups.id}
      inIDGroup={inIDGroup}
      groups={groups}
      inGroupTrue={inGroupTrue}
    />
  ))
  const listGroupMem = groupMember.map(groups => (
    <TaskManager
      key={groups.id}
      inIDGroup={inIDGroup}
      groups={groups}
      inGroupTrue={inGroupTrue}
    />
  ))
  return (
    <div className='card col-lg-4 col-sm-12 col-md-12'>
      <div className='card-body'>
        <CreateGroup onGetCreate={onGetCreate} />
        <p className='card-text'>Nhóm bạn quản lý</p>
        {listGroupAd}
        <p className='card-text'>Nhóm của bạn</p>
        {listGroupMem}
      </div>
    </div>
  )
}
