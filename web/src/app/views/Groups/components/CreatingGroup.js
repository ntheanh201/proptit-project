import React, { useState, useEffect } from 'react'
import './../styles/CreatingGroup.css'
function CreatingGroup(props) {
  const [groups, setGroups] = useState({
    id: '',
    nameGroup: '',
    description: '',
    isAdmin: true
  })

  useEffect(() => {
    return () => {
      setGroups({
        id: '',
        nameGroup: '',
        description: '',
        isAdmin: true
      })
    }
  }, [props.exitCreate])

  const handleChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value
    setGroups({
      ...groups,
      [name]: value
    })
  }

  const createGroup = (event) => {
    event.preventDefault()
    props.inGroupTrue(true)
    props.createGroup(groups)
  }
  return (
    <div>
      <div className='image-cover'></div>
      <h2>{groups.nameGroup}</h2>
      <button type='button' name='' className='btn btn-block btn-create'>
        <i className='far fa-images'></i>
        Thêm ảnh bìa
      </button>
      <div className='form-group'>
        <label>Tên nhóm:</label>
        <input
          type='text'
          name='nameGroup'
          className='form-control'
          placeholder='Nhập tên nhóm'
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Miêu tả nhóm:</label>
        <textarea
          className='form-control'
          name='description'
          rows='3'
          onChange={handleChange}
        ></textarea>
      </div>
      <input
        type='text'
        name='member'
        className='form-control'
        placeholder='Chọn thành viên'
      />
      <button
        type='button'
        className='btn btn-block btn-create'
        onClick={createGroup}
      >
        Tạo
      </button>
    </div>
  )
}

export default CreatingGroup
