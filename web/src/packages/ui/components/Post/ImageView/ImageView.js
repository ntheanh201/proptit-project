import React from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { Icon } from 'tabler-react'

import './ImageView.css'

export const ImageView = ({ onShowing, onClose, img }) => {
  return (
    <React.Fragment>
      <Modal show={onShowing} onHide={onClose} size='lg'>
        <Modal.Header>
          <CloseButton className='btn-modal' onClick={onClose}>
            <Icon prefix='fe' name={'x'} />
          </CloseButton>
        </Modal.Header>
        <Modal.Body>
          <img src={img} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`
