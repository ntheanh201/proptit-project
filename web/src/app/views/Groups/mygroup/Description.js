import React, { useState, useEffect } from 'react'
import './../styles/Description.css'

export default function Description(props) {
  const [edit, setEdit] = useState(false)
  const [groups, setGroups] = useState({
    id: '',
    nameGroup: '',
    description: '',
    isAdmin: true
  })

  const showEditTrue = () => {
    setEdit(true)
    setGroups({
      id: props.getGroup.id,
      nameGroup: props.getGroup.nameGroup,
      description: props.getGroup.description,
      isAdmin: true
    })
  }
  const showEditFalse = () => {
    setEdit(false)
  }

  const handleChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value
    setGroups({
      ...groups,
      [name]: value
    })
  }

  const editDescription = (event) => {
    event.preventDefault()
    props.setGroup(groups)
    showEditFalse()
  }

  const cancleEdit = () => {
    showEditFalse()
  }
  var show = edit ? (
    <form className='form-edit' onSubmit={editDescription}>
      <div className='form-group'>
        <label>Tên nhóm:</label>
        <input
          name='nameGroup'
          type='text'
          className='form-control'
          value={groups.nameGroup}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Miêu tả nhóm:</label>
        <textarea
          className='form-control'
          name='description'
          value={groups.description}
          onChange={handleChange}
          rows='3'
        ></textarea>
      </div>
      <div className='btn-edit row'>
        <button type='submit' className='btn btn-block col-5'>
          <i className='fa fa-check'></i>
        </button>
        <button
          type='button'
          onClick={cancleEdit}
          className='btn btn-block col-5'
        >
          <i className='fa fa-times'></i>
        </button>
      </div>
    </form>
  ) : (
    <div className='view-description'>
      <p className='description'>{props.getGroup.description}</p>
      <button
        type='button'
        onClick={showEditTrue}
        className='btn btn-block'
        disabled={!props.getGroup.isAdmin}
      >
        <i className='fa fa-pencil'></i>
        Sửa
      </button>
    </div>
  )
  return <div>{show}</div>
}
