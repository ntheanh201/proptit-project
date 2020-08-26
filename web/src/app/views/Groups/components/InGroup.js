import React from 'react'
import './../styles/InGroup.css'
import { Posts } from '../../Shared/components/Posts/Posts'

export default function InGroup() {
  return (
    <div className="in-group">
      <strong className="recent-post">RECENT ACTIVITY</strong>
      <div className="post-in-group">
        <Posts />
      </div>
    </div>
  )
}
