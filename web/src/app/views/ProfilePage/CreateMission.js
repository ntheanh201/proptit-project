import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Modal, Button} from 'react-bootstrap'

export default function CreateMission(props) {
  const [mission, setMission] = useState({
    id: null,
    content: '',
    deadline: null,
    completed: false,
    editMission: false
  })
  const notHandleSubmit = () => {
    props.closeAddMission();
    setMission({
      id: null,
      content: '',
      deadline: null,
      completed: false,
      editMission: false
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNewMission(mission)
    props.closeAddMission();
    setMission({
      id: null,
      content: '',
      deadline: null,
      completed: false,
      editMission: false
    })
  }
  return (
    <div>
      <Modal show={props.showAddMission} onHide={props.closeAddMission} size='lg'>
        <Modal.Header>
            <Modal.Title>Thêm nhiệm vụ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='add-mission'>
            <div className='form-group'>
                <label>Tên nhiệm vụ</label>
                <input
                type='text'
                className='form-control'
                onChange={(event) => {
                    setMission({
                    ...mission,
                    content: event.target.value
                    })
                }}
                placeholder='Bạn muốn làm gì vậy?'
                />
                <label className='deadline'>Deadline</label>
                <br />
                <DatePicker
                selected={mission.deadline}
                onChange={(date) => {
                    setMission({
                    ...mission,
                    deadline: date
                    })
                }}
                placeholderText={'Chọn Deadline'}
                showTimeSelect
                dateFormat='hh:mm dd/MM/yyyy'
                className='form-control'
                showYearDropdown
                />
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={notHandleSubmit}>
                <i className='fa fa-times-circle' aria-hidden='true' />
                {' Hủy bỏ'}
            </Button>
            <Button variant="success" onClick={handleSubmit}>
                <i className='fas fa-save' />
                {' Lưu lại'}
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
