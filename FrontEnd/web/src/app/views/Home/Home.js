import React from 'react'
import { withRouter } from 'react-router-dom'

import { Card, CardBody } from 'ui'

const Container = props => {
  console.log(props.history)
  return (
    <Card>
      <CardBody>Home</CardBody>
    </Card>
  )
}

export const Home = withRouter(Container)
