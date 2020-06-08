import React from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { Icon } from 'tabler-react'

import { CreatePost } from './CreatePost'

export const EditPostModal = ({ post, modalVisible, onClose }) => {
  return (
    <Modal show={modalVisible} size='lg'>
      <Modal.Header>
        <Modal.Title>Sửa bài viết</Modal.Title>
        <CloseButton className='btn-modal' onClick={onClose}>
          <Icon prefix='fe' name={'x'} />
        </CloseButton>
      </Modal.Header>
      <Modal.Body>
        <CreatePost isEdit post={post} />
      </Modal.Body>
    </Modal>
  )
}

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`
