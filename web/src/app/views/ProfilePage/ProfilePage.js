import React, { useState } from 'react'
import styled from 'styled-components'
import CreateMission from './CreateMission'

import { Page, Timeline, Form } from 'tabler-react'

import { ImageView } from 'ui'
import './Styles/ProfilePage.css'

export const ProfilePage = ({ state, setState }) => {
  const {
    avt,
    cover,
    grade,
    gender,
    address,
    email,
    position,
    missions,
    showMenu,
    username,
    displayName,
    dateOfBirth,
    description,
    phoneNumber,
    generation,
    showModal // show image check
  } = state

  // show image
  const onShowImg = (image) => {
    setState({ showModal: true })
  }

  // close image
  const onCloseImg = () => {
    setState({ showModal: false })
  }

  const RenderInformation = () => {
    return (
      <Timeline>
        <Timeline.Item title={'Họ và tên: ' + displayName} badgeColor='red' />
        <Timeline.Item title={'Username: ' + username} badge />
        <Timeline.Item
          title={'Ngày tháng năm sinh: ' + dateOfBirth}
          badgeColor='blue'
        />
        <Timeline.Item title={'Giới tính: ' + gender} badgeColor='yellow' />
        <Timeline.Item title={'Khoá: ' + grade} badgeColor='wheat' />
        <Timeline.Item
          title={'Làm việc tại: ' + position + ' Gen ' + generation}
          badgeColor='orange'
        />
        <Timeline.Item title={'Quê quán: ' + address} badge />
        {phoneNumber && (
          <Timeline.Item
            title={'Số điện thoại: ' + phoneNumber}
            badgeColor={'pink'}
          />
        )}
        {email && (
          <Timeline.Item title={'Email: ' + email} badgeColor='yellow' />
        )}
        {description && (
          <Timeline.Item
            title={'Châm ngôn yêu thích: ' + description}
            badgeColor='green'
          />
        )}
      </Timeline>
    )
  }

  const RenderMissions = () => {
    return (
      <div className='table-responsive'>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên nhiệm vụ</th>
              <th>Deadline</th>
              <th>Trạng thái</th>
              <th>Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {showTableMission}
          </tbody>
        </table>
      </div>
    )
  }
  const addNewMission = (mission) => {
    var index = 1
    mission.id = index
    index += 1
    setState({ missions: [...missions, mission] })
  }
  const showTableMission = 
      missions.map((mission,index) => (
        <tr
          key={index} 
          className={mission.completed ? "table-success" : mission.deadline.getTime() < Date.now() ? 'table-danger' : 'table-warning'}
        >
          <td>{index + 1}</td>
          <td>{ mission.content }</td>
          <td>{ mission.deadline.toLocaleString('vi') }</td>
          <td>
          <Form.Group>
            <Form.Checkbox
              label={mission.completed ? "Đã hoàn thành" : mission.deadline.getTime() < Date.now() ? 'Quá Deadline' : 'Chưa hoàn thành'}
              name="completed"
              checked = {mission.completed}
              onChange = {
                (event) => {
                  const target = event.target
                  const value = target.type === 'checkbox' ? target.checked : target.value
                  setState({missions: [...missions,{...mission, completed: value}]})
                }
              }
            />
          </Form.Group>
          </td>
          <td>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-warning"
                >
                    <i className="fas fa-edit"></i>
                    {" Sửa"}
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                >
                    <i className="fas fa-trash-alt"></i>
                    {" Xóa"}
                </button>
            </div>
          </td>
        </tr>
      ))
  return (
    <div>
      <Page>
        <div className='top-profile'>
          <Cover src={cover} />
          <div
            className='avt'
            style={{ backgroundImage: 'url(' + avt + ')' }}
            onClick={() => {
              onShowImg()
            }}
          />
          <ImageView img={avt} show={showModal} close={onCloseImg} />
          
          <h3 className="name">{displayName}</h3>
          <p className="description">{description}</p>
          <ul className="nav nav-tabs nav-stacked menu-profile">
            <li className='nav-item view-item'>
              <a className='nav-link active'>
                {showMenu === 1
                  ? 'Dòng thời gian'
                  : showMenu === 2
                  ? 'Giới thiệu'
                  : 'Nhiệu vụ hàng tháng'}
              </a>
            </li>
            <li className="nav-item hidden-menu">
              <a
                onClick={() => setState({ showMenu: 1 })}
                className={showMenu === 1 ? 'nav-link active' : 'nav-link'}
              >
                Dòng thời gian
              </a>
            </li>
            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 2 })}
                className={showMenu === 2 ? 'nav-link active' : 'nav-link'}
              >
                Giới thiệu
              </a>
            </li>
            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 3 })}
                className={showMenu === 3 ? 'nav-link active' : 'nav-link'}
              >
                Nhiệm vụ hàng tháng
              </a>
            </li>
          </ul>
          <button
            className='more-menu'
            type='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='fas fa-ellipsis-h'></i>
          </button>
          <div className='dropdown-menu'>
            <button
              className='dropdown-item'
              onClick={() => {
                if (showMenu === 1) {
                  setState({ showMenu: 2 })
                } else if (showMenu === 2) {
                  setState({ showMenu: 3 })
                } else setState({ showMenu: 1 })
              }}
            >
              {showMenu === 1
              ? 'Giới thiệu'
              : showMenu === 2
              ? 'Nhiệu vụ hàng tháng'
              : 'Dòng thời gian'}
            </button>
            <button
              onClick={() => {
                if (showMenu === 1) {
                  setState({ showMenu: 3 })
                } else if (showMenu === 2) {
                  setState({ showMenu: 1 })
                } else setState({ showMenu: 2 })
              }}
              className='dropdown-item'
            >
              {showMenu === 1
                ? 'Nhiệu vụ hàng tháng'
                : showMenu === 2
                ? 'Dòng thời gian'
                : 'Giới thiệu'}
            </button>
          </div>
        </div>
      </Page>
      <Page>
        <div className='display-body'>
          <div className={showMenu === 1 ? 'left-status' : 'show-false'}>
            <h3 className='title-body'>Giới thiệu</h3>
            <p>
              <i className='far fa-user' />
              {' ' + 'Khóa: '}
              <strong>{grade}</strong>
            </p>
            <p>
              <i className='fas fa-briefcase' />
              {' ' + 'Làm việc tại: '}
              <strong>
                {generation && position ? position + ' Gen ' + generation : ''}
              </strong>
            </p>
          </div>
          <div className={showMenu === 1 ? 'right-status' : 'body-profile'}>
            {showMenu === 1 ? (
              <div>Chỗ này là Post cá nhân</div>
            ) : showMenu === 2 ? (
              <div>
                <h3 className='title-body'>
                  Giới thiệu
                  <i className='fas fa-edit edit-profile' />
                </h3>
                <RenderInformation />
              </div>
            ) : (
              <div>
                <CreateMission addNewMission={addNewMission} />
                <RenderMissions />
              </div>
            )}
          </div>
        </div>
      </Page>
    </div>
  )
}

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`
