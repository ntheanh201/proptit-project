import React from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { Icon } from 'tabler-react'

import { CreatePost } from './CreatePost'

export const EditPostModal = ({ post, modalVisible, setEditPostVisible }) => {
  return (
    <Modal show={modalVisible} size='lg'>
      <Modal.Header>
        <Modal.Title>Sửa bài viết</Modal.Title>
        <CloseButton
          className='btn-modal'
          onClick={() => setEditPostVisible(!modalVisible)}
        >
          <Icon prefix='fe' name={'x'} />
        </CloseButton>
      </Modal.Header>
      <Modal.Body>
        <CreatePost
          isEdit
          post={post}
          setEditPostVisible={setEditPostVisible}
        />
      </Modal.Body>
    </Modal>
  )
}

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`
