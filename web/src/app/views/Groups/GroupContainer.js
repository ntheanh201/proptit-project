import React, { useState } from 'react'
import SettingGroup from './mygroup/SettingGroup'
import MyGroup from './mygroup/MyGroup'
import ManageGroup from './components/ManageGroup'
import PostGroup from './components/PostGroup'
import { Groups } from '../Home/components/Groups'

export const GroupContainer = () => {
  const [isCreate, setIsCreate] = useState(false)

  const onGetCreate = (check) => {
    setIsCreate(check)
  }
  const [groupEdit, setGroupEdit] = useState(null)
  const [inGroup, setInGroup] = useState(false)
  const [admin, setAdmin] = useState([])
  const [member, setMember] = useState([])
  const [groups, setGroups] = useState([
    {
      id: '1',
      nameGroup: 'CLB Lập Trình PTIT',
      description: 'Đây là group của CLB Lập Trình',
      isAdmin: true
    },
    {
      id: '2',
      nameGroup: 'Ban Sự Kiện Gen 6',
      description: 'Đây là group của D18 Ban Sự Kiện',
      isAdmin: true
    },
    {
      id: '3',
      nameGroup: 'Thuật toán',
      description: 'Đây là group của trao đổi về thuật toán',
      isAdmin: false
    },
    {
      id: '4',
      nameGroup: 'AI PROPTIT 2020',
      description: 'Đây là group của Multi để dạy AI cho Pro',
      isAdmin: false
    }
  ])
  const setGroup = (data) => {
    groups[findIndex(data.id)] = data
    setGroupCurrent(data)
  }
  const inGroupTrue = (check) => {
    setInGroup(check)
  }

  const [groupCurrent, setGroupCurrent] = useState({})
  const groupAd = groups.filter((groupfil) => groupfil.isAdmin === true)
  const groupMb = groups.filter((groupfil) => groupfil.isAdmin === false)
  const findIndex = (id) => {
    var result = -1
    groups.forEach((group, index) => {
      if (group.id === id) {
        result = index
      }
    })
    return result
  }
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  const createID = () => {
    return (
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4()
    )
  }
  const createGroup = (data) => {
    data.id = createID()
    groups.push(data)
    setGroupCurrent(data)
  }
  const inIDGroup = (id) => {
    setGroupCurrent(groups[findIndex(id)])
  }
  var show = inGroup ? (
    <div className='row'>
      <SettingGroup getIsAdmin={groupCurrent.isAdmin} />
      <MyGroup setGroup={setGroup} getGroup={groupCurrent} />
    </div>
  ) : (
    <div className='row'>
      <ManageGroup
        onGetCreate={onGetCreate}
        groupAdmin={groupAd}
        groupMember={groupMb}
        inGroupTrue={inGroupTrue}
        inIDGroup={inIDGroup}
      />
      <PostGroup
        showCreate={isCreate}
        inGroupTrue={inGroupTrue}
        createGroup={createGroup}
      />
    </div>
  )
  return <div>{show}</div>
}
