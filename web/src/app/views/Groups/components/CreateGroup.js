import React, { useState } from 'react'
import './../styles/CreateGroup.css'

function CreateGroup(props) {
  const [isCreate, setIsCreate] = useState(true)
  const onGetCreate = () => {
    setIsCreate(!isCreate)
    props.onGetCreate(isCreate)
  }
  return (
    <div>
      <form>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fa fa-search'></i>
            </span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Tìm kiếm nhóm'
          />
        </div>
      </form>
      <button
        type='button'
        name=''
        className='btn btn-block'
        onClick={onGetCreate}
      >
        <i className={!isCreate ? 'fas fa-times' : 'fas fa-plus'}></i>
        {!isCreate ? 'Hủy tạo nhóm' : 'Tạo nhóm mới'}
      </button>
    </div>
  )
}

export default CreateGroup
