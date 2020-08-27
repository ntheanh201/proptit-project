import React, { useState } from 'react'
import styled from 'styled-components'
import { Page, Timeline, Form } from 'tabler-react'
import { Modal, Button } from 'react-bootstrap'
import './Information.css'



export const RenderInformation = ({
  displayName,
  username,
  dateOfBirth,
  gender,
  grade,
  position,
  generation,
  address,
  phoneNumber,
  email,
  description,
  onInfoChange
}) => {

  const [editInfo, setEditInfo] = useState(false)

  const openEditInfo = () => {
    setEditInfo(true)
  }
  const closeEditInfo = () => {
    setEditInfo(false)
  }

  

  const ShowEditInfo = () => {
    const handleClose = () => closeEditInfo()
    const change ={
      displayName,
      username,
      dateOfBirth,
      gender,
      grade,
      position,
      generation,
      address,
      phoneNumber,
      email,
      description,
    }
    const handleChange = (event) => {
      let target = event.target;
      let value = target.value;
      let name = target.name;
      change.username = value;
      onInfoChange(change);
      console.log(name)
      console.log(value)
      // console.log(displayName)
    }
    const onSubmit = () => {
      closeEditInfo()
      onInfoChange(change);
      console.log(change);
    }

    return (
      <Modal show={editInfo} size='lg'>
        <Modal.Header className='modal-header'>
          <Modal.Title className="title"><b>Chỉnh sửa thông tin cá nhân</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <div className="row input-box">
              <div className="col-md-3 title-input">Họ và tên</div>
              <div className="col-md-9">
                  <Form.Input
                  name="displayName"
                  placeholder="Họ tên"
                  value={displayName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Username</div>
              <div className="col-md-9">
                <Form.Input
                  name="username"
                  placeholder="Username"
                  value={change.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Ngày sinh</div>
              <div className="col-md-9">
                <Form.DatePicker
                  defaultDate={new Date("2020-08-24T09:53:18.172Z")}
                  format="dd/mm/yyyy"
                  maxYear={2020}
                  minYear={1897}
                  monthLabels={[
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12'
                  ]}
                  
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Giới tính</div>
              <div className="col-md-9">
                <Form.Select>
                  <option>
                    Nam
                  </option>
                  <option>
                    Nữ
                  </option>
                </Form.Select>
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Khóa</div>
              <div className="col-md-9">
                <Form.Input
                  name="example-text-input"
                  placeholder="Khóa"
                  value={grade}
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Địa chỉ</div>
              <div className="col-md-9">
                <Form.Input
                  name="example-text-input"
                  placeholder="Địa chỉ"
                  value={address}
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Số điện thoại</div>
              <div className="col-md-9">
                <Form.Input
                  name="example-text-input"
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="col-md-3 title-input">Email</div>
              <div className="col-md-9">
                <Form.Input
                  name="example-text-input"
                  placeholder="Email"
                  value={email}
                />
              </div>
            </div>

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 info-box">
            <div>
              <h3 className='title-body'>Giới thiệu
                  <i
                  className='fa fa-ellipsis-v'
                  onClick={() => {
                    openEditInfo()
                  }}
                />
              </h3>
              <ShowEditInfo />

            </div>
            {displayName ? (<div><i className="icon fa fa-user"></i>{displayName} </div>) : <div></div>}
            {username ? (<div><i className="icon fa fa-id-badge"></i> {username} </div>) : <div></div>}
            {dateOfBirth ? (<div><i className="icon fa fa-birthday-cake"></i> {dateOfBirth} </div>) : <div></div>}
            {gender ? (<div><i className="icon fa fa-venus-mars"></i> {gender} </div>) : <div></div>}
            {grade ? (<div><i className="icon fa fa-graduation-cap"></i> {grade} </div>) : <div></div>}
            {address ? (<div><i className="icon fa fa-location-arrow"></i> {address} </div>) : <div></div>}
            {phoneNumber ? (<div><i className="icon fa fa-phone"></i> {phoneNumber} </div>) : <div></div>}
            {email ? (<div><i className="icon fa fa-envelope"></i> {email} </div>) : <div></div>}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>

    </React.Fragment>
  )
}
