import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../../../app/assets/ProPTIT.png'

export default function Navar() {

  let [searchBoxContent, setSetSearchBoxContent] = useState('');
  let [showMultiTask, setShowMultiTask] = useState(false);
  let [showNotification, setShowNotification] = useState(false);
  const handleClick = (e) => {
    console.log(searchBoxContent);
  }
  const handleChange = (e) => {
    setSetSearchBoxContent(e.target.value);
  }
  const onShowMultiTaskClick = () => {
    setShowNotification(false);
    setShowMultiTask(!showMultiTask);
  }
  const onShowNoticationClick = () => {
    setShowMultiTask(false);
    setShowNotification(!showNotification);
  }
  var notifications = [
    {
      author: 'Thế Anh',
      action: ' Đăng bài viết mới',
      timeCreated: '11 phút trước'
    },
    {
      author: 'Công Khanh',
      action: ' Đã trả lời bình luận của bạn',
      timeCreated: '11 phút trước'
    },
    {
      author: 'Tiến Hải',
      action: ' Đã bày tỏ cảm xúc về bài viết của bạn',
      timeCreated: '11 phút trước'
    }
  ]
  let notificationElm = notifications.map((item, index) => {
    return (
      < div key={index} className="notification-item np" >
        <div className="notification-item-content">
          <strong>{item.author}</strong>
          {item.action}

        </div>
        <div className="notification-time"><small>{item.timeCreated}</small></div>
      </div >
    )
  })
  return (

    <nav className="nav">
      <div className="row nav-bar col-sm-12">
        <div className="nav-currency col-sm-12 col-md-6 col-lg-8 col-xl-8">
          <img src={logo} className="nav-bar-brand" alt="proptit"/>
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={searchBoxContent}
              onChange={handleChange}
              id="searchAll"
              className="nav-bar-search-input" />
            <button
              type="button"
              className="btn-search bg-grey"
              onClick={handleClick}
            >
              <i className="fas fa-search nav-bar-search"></i>
            </button>
          </form>
        </div>

        <div className="nav-currency col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <Link to="/" exact><i className="fas fa-home nav-bar-icon"></i></Link>
          <Link to="/groups"><i className="fas fa-user-friends nav-bar-icon"></i></Link>
          <Link to="/404"><i className="fas fa-image nav-bar-icon "></i></Link>
          <Link to="/404"><i className="fas fa-comments nav-bar-icon"></i></Link>
          <i
            className="fas fa-bell nav-bar-icon noti"
            onClick={onShowNoticationClick}
          ><i className="fas fa-circle noti-item"></i></i>
          <img
            className="user-ava"
            onClick={onShowMultiTaskClick}
            src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"
            alt="avatar-user"
          />
        </div>
      </div>
      <div className={showMultiTask ? "dropdown-profile " : "dropdown-profile dp-none"}>
        <div className="block-container">
          <div className="dropdown-item"><Link to="profile/1"><i className="far fa-user-circle"></i>Profile</Link></div>
          <div className="dropdown-item"><a><i className="fas fa-cog"></i>Setting</a></div>
          <div className="dropdown-item"><a><i className="far fa-envelope"></i>Inbox</a></div>
          <div className="dropdown-item"><a><i className="far fa-question-circle"></i>Need help?</a></div>
          <div className="dropdown-item"><a><i className="fas fa-sign-out-alt"></i>Sign out</a></div>
        </div>
      </div>
      <div className={showNotification ? "block-profile " : "block-profile dp-none"}>
        <div className="block-container">
          {notificationElm}
        </div>
      </div>
    </nav>
  )
}
