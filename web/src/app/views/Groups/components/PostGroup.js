import React, { useState } from 'react'

import { Post } from '../../Shared/components/Post/Post'
import CreatingGroup from './CreatingGroup'

export default function PostGroup(props) {
  var show = props.showCreate ? (
    <div>
      <CreatingGroup
        exitCreate={props.showCreate}
        inGroupTrue={props.inGroupTrue}
        createGroup={props.createGroup}
      />
    </div>
  ) : (
    <div>
      <Post />
    </div>
  )
  return (
    <div className='card col-lg-7 col-sm-12 col-md-12 p-lg-5 p-sm-5 p-md-5 p-5'>
      {show}
    </div>
  )
}
