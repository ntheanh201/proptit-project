import React from 'react'

import { Card, Button, Form } from 'tabler-react'

export const FormCard = ({
  children,
  action,
  method,
  onSubmit,
  title,
  buttonText
}) => {
  return (
    <Card onSubmit={onSubmit} action={action} method={method}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        {children}
        <Form.Footer>
          <Button type='submit' color='primary' block>
            {buttonText}
          </Button>
        </Form.Footer>
      </Card.Body>
    </Card>
  )
}
