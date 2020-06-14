import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingIndicator } from 'ui'
import * as groupActions from '../../redux/action-creators/group'
import { MyGroup } from './MyGroup/MyGroup'

export const Group = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    dispatch(groupActions.getGroupById(id))
  }, [])
  const { group } = useSelector(state => state.groupReducer)

  if (!group) {
    return <LoadingIndicator />
  }

  return (
    <Wrapper>
      <MyGroup name={group.name} isAdmin={group.is_admin} />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.div`
  cursor: pointer;
`
