import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Icon } from 'tabler-react'

import './ImageView.css'

export const ImageView = ({ onShowing, onClose, img }) => {
  return (
    <React.Fragment>
      <Modal show={onShowing} onHide={onClose} size='lg'>
        <Modal.Header>
          <button className='btn-modal' onClick={onClose}>
            <Icon prefix='fe' name={'x'} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <img src={img} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
