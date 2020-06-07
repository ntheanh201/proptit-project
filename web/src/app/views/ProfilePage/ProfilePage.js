import React, { useState } from 'react'
import styled from 'styled-components'
import CreateMission from './CreateMission'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, Button } from 'react-bootstrap'

import { Page, Timeline, Form } from 'tabler-react'

import { ImageView } from 'ui'
import './Styles/ProfilePage.css'
import { RenderInformation } from './RenderInformation'

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
    showModal, // show image check
    editingMission, // save mission edit
    editInfo,
    idChoose
  } = state

  // show image
  const onShowImg = image => {
    setState({ showModal: true })
  }

  // close image
  const onCloseImg = () => {
    setState({ showModal: false })
  }
  const ShowEditInfo = () => {
    const handleClose = () => setState({ editInfo: false })

    return (
      <>
        <Modal show={editInfo} size='lg'>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  const [showAddMission, setShowAddMission] = useState(false)
  const [showEditMission, setShowEditMission] = useState(false)
  const openAddMission = () => {
    setShowAddMission(true)
  }

  const closeAddMission = () => {
    setShowAddMission(false)
  }
  const RenderMissions = () => {
    return (
      <div>
        <div className='card'>
          <div className='header-table-mission'>
            <div>
              <button
                type='button'
                className='btn btn-circle btn-sm px-2'
                onClick={openAddMission}
              >
                <i className='fas fa-plus mt-0'></i>
              </button>
              <button
                type='button'
                className='btn btn-circle btn-sm px-2'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <i className='fas fa-search mt-0'></i>
              </button>
              <div className='dropdown-menu'>
                <input
                  type='text'
                  className='dropdown-item form-control'
                  placeholder='Search'
                />
              </div>
            </div>
            <h4>Nhiệm vụ hàng tháng</h4>
            <div>
              <button type='button' className='btn btn-circle btn-sm px-2'>
                <i className='fas fa-check mt-0'></i>
              </button>
              <button
                type='button'
                className='btn btn-circle btn-sm px-2'
                onClick={() => {
                  setShowEditMission(true)
                  idChoose.forEach(choose => {
                    const list = missions.map(item => {
                      if (item.id === choose) {
                        item.editMission = true
                        return item
                      } else {
                        return item
                      }
                    })
                    setState({
                      missions: list
                    })
                  })
                  console.log(missions)
                }}
              >
                <i className='fas fa-pencil-alt mt-0'></i>
                <Modal show={showEditMission} size='lg'>
                  <Modal.Header>
                    <Modal.Title>Chỉnh sửa nhiệm vụ</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant='secondary'
                      // onClick={() => {

                      // }}
                    >
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      // onClick={() => {

                      // }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </button>
              <button
                type='button'
                className='btn btn-circle btn-last btn-sm px-2'
                onClick={() => {
                  idChoose.forEach(choose => {
                    const list = missions.filter(item => item.id !== choose)
                    setState({
                      missions: list
                    })
                  })
                  console.log(missions)
                }}
              >
                <i className='far fa-trash-alt mt-0'></i>
              </button>
            </div>
          </div>
          <div className='table-wrapper table-responsive'>
            <table className='table table-hover mb-0'>
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th className='th-lg'>
                    <a>
                      Tên nhiệm vụ
                      <i className='fas fa-sort ml-1'></i>
                    </a>
                  </th>
                  <th className='th-lg'>
                    <a>
                      Deadline
                      <i className='fas fa-sort ml-1'></i>
                    </a>
                  </th>
                  <th className='th-lg'>
                    <a>
                      Trạng thái
                      <i className='fas fa-sort ml-1'></i>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>{showTableMission}</tbody>
            </table>
          </div>
          {missions.length && missions
            ? null
            : 'Bạn đang không có nhiệm vụ nào!'}
        </div>
        <div className='page-month'>
          <ul className='menu-month'>
            <li className='month'>
              <a href='#'>
                <i className='fas fa-angle-left'></i>
              </a>
            </li>
            <li className='month'>
              <a href='#'>2</a>
            </li>
            <li className='month'>
              <a href='#'>3</a>
            </li>
            <li className='month'>
              <a href='#'>4</a>
            </li>
            <li className='month'>
              <a href='#'>
                <i className='fas fa-angle-right'></i>
              </a>
            </li>
          </ul>
          <div
            className='year'
            type='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <p>
              {'2020 '}
              <i className='fas fa-caret-down'></i>
            </p>
          </div>
          <div className='dropdown-menu'>
            <button className='dropdown-item'>2021</button>
            <button className='dropdown-item'>2022</button>
          </div>
        </div>
      </div>
    )
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
  const addNewMission = mission => {
    mission.id = createID()
    setState({ missions: [...missions, mission] })
  }
  const showTableMission = missions.map(mission => (
    <tr
      key={mission.id}
      className={
        mission.completed
          ? 'table-success'
          : mission.deadline.getTime() < Date.now()
          ? 'table-danger'
          : 'table-warning'
      }
    >
      <th scope='row'>
        <input
          className='form-check-input check-mission'
          type='checkbox'
          id='checkbox1'
          name='choose'
          onChange={event => {
            const target = event.target
            const value =
              target.name === 'choose' ? target.checked : target.value
            if (value === true) {
              idChoose.push(mission.id)
              console.log(idChoose)
            } else {
              var index1
              idChoose.forEach((item, index) => {
                if (item === mission.id) {
                  index1 = index
                }
              })
              idChoose.splice(index1, 1)
            }
          }}
        />
        <label className='form-check-label' for='checkbox1'></label>
      </th>
      <td>{mission.content}</td>
      <td>
        {mission.editMission ? (
          <DatePicker
            selected={editingMission}
            onChange={date => {
              setState({
                editingMission: date
              })
            }}
            showTimeSelect
            placeholderText={mission.deadline.toLocaleString('vi')}
            dateFormat='hh:mm dd/MM/yyyy'
            className='form-control'
            showYearDropdown
          />
        ) : (
          mission.deadline.toLocaleString('vi')
        )}
      </td>
      <td>
        {mission.completed
          ? 'Đã hoàn thành'
          : mission.deadline.getTime() < Date.now()
          ? 'Quá Deadline'
          : 'Chưa hoàn thành'}
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

          <h3 className='name'>{displayName}</h3>
          <p className='description'>{description}</p>
          <ul className='nav nav-tabs nav-stacked menu-profile'>
            <li className='nav-item view-item'>
              <a className='nav-link active'>
                {showMenu === 1
                  ? 'Dòng thời gian'
                  : showMenu === 2
                  ? 'Giới thiệu'
                  : 'Nhiệu vụ hàng tháng'}
              </a>
            </li>
            <li className='nav-item hidden-menu'>
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
                  <i
                    className='fas fa-edit edit-profile'
                    onClick={() => {
                      setState({ editInfo: true })
                    }}
                  />
                </h3>
                <ShowEditInfo />
                <RenderInformation {...state} />
              </div>
            ) : (
              <div>
                <CreateMission
                  addNewMission={addNewMission}
                  showAddMission={showAddMission}
                  closeAddMission={closeAddMission}
                />
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
