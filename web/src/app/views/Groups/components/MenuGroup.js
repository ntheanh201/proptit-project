import React, { useState } from 'react'
import './../styles/MenuGroup.css'

export default function MenuGroup() {

  const moreGroup =
  <>
    <div className="go-to-group">
      <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
      <div className="name-go-to-group">
        <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
        <p>2 thang truoc</p>
      </div>
    </div>
    <div className="go-to-group">
      <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
      <div className="name-go-to-group">
        <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
        <p>2 thang truoc</p>
      </div>
    </div>
    <div className="go-to-group">
      <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
      <div className="name-go-to-group">
        <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
        <p>2 thang truoc</p>
      </div>
    </div>
  </>

  const [showMoreGroup, setShowMoreGroup] = useState(false)

  return (
    <div className="menu-group">
      <div className="title-group">
        <h3>Groups</h3>
        <label
          htmlFor="searchAll"
          className="search-group">
          <i className="fa fa-search" aria-hidden="true"></i>
        </label>
      </div>
      <div className="list-go-to-group">
        <div className="in-create-new-group">
          <button type="button" className="create-new-group">
            <i className="fa fa-plus" aria-hidden="true"></i>
            Create New Group
          </button>
        </div>
        <div className="your-manager">
          <h5>Groups You Manager</h5>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsdnflkslkeflkselkfnlksnefklnslkenflksndlfknselnfles</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          {showMoreGroup ? moreGroup : null}
          {!showMoreGroup ?
            <button
              type="button"
              onClick={() => setShowMoreGroup(true)}
              className="your-groups-more">
              See more
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </button> : null
          }
        </div>
        <div className="your-group">
        <h5>Your Groups</h5>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsdnflkslkeflkselkfnlks</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsdnflkslkefl</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          <div className="go-to-group">
            <img src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"/>
            <div className="name-go-to-group">
              <h5>BSKdsnkflsd</h5>
              <p>2 thang truoc</p>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  )
}
