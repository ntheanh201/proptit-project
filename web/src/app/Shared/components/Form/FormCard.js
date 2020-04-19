import React from 'react'

import { Button, Form } from 'tabler-react'
import { Card, CardHeader, CardTitle, CardBody } from 'ui'

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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {children}
        <Form.Footer>
          <Button type='submit' color='primary' block onClick={onSubmit}>
            {buttonText}
          </Button>
        </Form.Footer>
      </CardBody>
    </Card>
  )
}
