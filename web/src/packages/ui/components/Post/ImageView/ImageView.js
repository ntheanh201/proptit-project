import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Icon } from 'tabler-react'

import './ImageView.css'

export const ImageView = ({ show, close, img }) => {
  return (
    <React.Fragment>
      <Modal show={show} onHide={close} size='lg'>
        <Modal.Header>
          <button onClick={close}>
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
