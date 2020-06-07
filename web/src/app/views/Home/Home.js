import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Page, Grid } from 'tabler-react'

import * as PostActions from '../../redux/action-creators/post'
import { NewFeeds } from './components/NewFeeds'

export const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PostActions.getAllPosts())
  }, [])

  return (
    <Page>
      <Page.Main>
        <Grid.Row>
          <NewFeeds />
        </Grid.Row>
      </Page.Main>
    </Page>
  )
}
