import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { LoadingIndicator } from 'ui'

const Group = ({ id, name }) => {
  const history = useHistory()

  return (
    <Wrapper>
      <Content onClick={() => history.push(`/group/${id}`)}>{name}</Content>
    </Wrapper>
  )
}

export const GroupContainer = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.homeReducer)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    setGroups(user.participating_group)
  }, [])
  // const [isCreate, setIsCreate] = useState(false)

  // const onGetCreate = check => {
  //   setIsCreate(check)
  // }

  // const [groupEdit, setGroupEdit] = useState(null)
  // const [inGroup, setInGroup] = useState(false)
  // const [admin, setAdmin] = useState([])
  // const [member, setMember] = useState([])

  // const setGroup = data => {
  //   groups[findIndex(data.id)] = data
  //   setGroupCurrent(data)
  // }
  // const inGroupTrue = check => {
  //   setInGroup(check)
  // }

  // const [groupCurrent, setGroupCurrent] = useState({})
  // const groupAd = groups.filter(group => group.isAdmin === true)
  // const groupMb = groups.filter(group => group.isAdmin === false)
  // const findIndex = id => {
  //   var result = -1
  //   groups.forEach((group, index) => {
  //     if (group.id === id) {
  //       result = index
  //     }
  //   })
  //   return result
  // }
  // const createGroup = data => {
  //   data.id = createID()
  //   groups.push(data)
  //   setGroupCurrent(data)
  // }
  // const inIDGroup = id => {
  //   setGroupCurrent(groups[findIndex(id)])
  // }

  // const show = inGroup ? (
  //   <div className='row'>
  //     <SettingGroup getIsAdmin={groupCurrent.isAdmin} />
  //     <MyGroup setGroup={setGroup} getGroup={groupCurrent} />
  //   </div>
  // ) : (
  //   <div className='row'>
  //     <ManageGroup
  //       onGetCreate={onGetCreate}
  //       groupAdmin={groupAd}
  //       groupMember={groupMb}
  //       inGroupTrue={inGroupTrue}
  //       inIDGroup={inIDGroup}
  //     />
  //     <PostGroup
  //       showCreate={isCreate}
  //       inGroupTrue={inGroupTrue}
  //       createGroup={createGroup}
  //     />
  //   </div>
  // )
  // return <div>{show}</div>

  if (!groups) {
    return <LoadingIndicator />
  }

  return (
    <div>
      {groups.map(({ id, name }) => (
        <Group key={id} id={id} name={name} />
      ))}
    </div>
  )
}

const Wrapper = styled.div``

const Content = styled.div`
  cursor: pointer;
`
