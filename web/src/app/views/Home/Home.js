import React from 'react'
import { Page, Grid } from 'tabler-react'

import { Posts } from '../Shared/components/Posts/Posts'

export const Home = () => {
  return (
    <Page>
      <Page.Main>
        <Grid.Row>
          <Posts />
        </Grid.Row>
      </Page.Main>
    </Page>
  )
}
