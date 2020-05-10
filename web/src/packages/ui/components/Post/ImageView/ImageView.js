import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Icon } from 'tabler-react'
import './ImageView.css'

export const ImageView = (props) => {
  return (
    <React.Fragment>
      <Modal show={props.show} onHide={props.close} size='lg'>
        <Modal.Header>
          <button onClick={props.close}>
            <Icon prefix='fe' name={'x'} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <img src={props.img}></img>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
