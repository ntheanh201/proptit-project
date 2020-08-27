import React, { useState } from 'react'

import './../styles/MenuGroup.css'

import { Post } from '../../Shared/components/Post/Post'
import { Description } from './Description'

export const MenuGroup = props => {
  const [isDiscuss, setIsDiscuss] = useState(true)
  const handleClickFalse = () => {
    setIsDiscuss(false)
  }
  const handleClickTrue = () => {
    setIsDiscuss(true)
  }
  const showMenu = isDiscuss ? (
    <Post />
  ) : (
    <Description setGroup={props.setGroup} getGroup={props.getGroup} />
  )
  return (
    <div>
      <ul className='nav nav-tabs nav-stacked nav-page'>
        <li className='nav-item'>
          <a
            onClick={handleClickTrue}
            className={
              isDiscuss ? 'nav-link active nav-menu' : 'nav-link nav-menu'
            }
          >
            Thảo luận
          </a>
        </li>
        <li className='nav-item'>
          <a
            onClick={handleClickFalse}
            className={
              !isDiscuss ? 'nav-link active nav-menu' : 'nav-link nav-menu'
            }
          >
            Giới thiệu
          </a>
        </li>
      </ul>
      {showMenu}
    </div>
  )
}
