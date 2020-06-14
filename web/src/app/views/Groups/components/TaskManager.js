import React from 'react'
import styled from 'styled-components'

export const TaskManager = props => {
  const inIDGroup = () => {
    props.inGroupTrue(true)
    props.inIDGroup(props.groups.id)
  }
  return (
    <a className='link-group' onClick={inIDGroup}>
      <ImgPage></ImgPage>
      <h5>{props.groups.nameGroup}</h5>
    </a>
  )
}
const ImgPage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  border-radius: 5px;
`
