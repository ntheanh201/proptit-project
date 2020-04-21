import React, { useState } from 'react'
import './../styles/CreateGroup.css'

const CreateGroup = (props) => {
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
              <i className='fa fa-search' />
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
        <i className={!isCreate ? 'fas fa-times' : 'fas fa-plus'} />
        {!isCreate ? 'Hủy tạo nhóm' : 'Tạo nhóm mới'}
      </button>
    </div>
  )
}

export default CreateGroup
