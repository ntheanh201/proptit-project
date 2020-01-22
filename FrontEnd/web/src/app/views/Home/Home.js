import React from 'react'
import { withRouter } from 'react-router-dom'

import { Card } from 'tabler-react'

const Container = props => {
  console.log(props.history)
  return (
    <Card>
      <Card.Body>Home</Card.Body>
    </Card>
  )
}

export const Home = withRouter(Container)
