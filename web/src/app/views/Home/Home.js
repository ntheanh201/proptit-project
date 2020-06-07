import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Page, Grid, Icon } from 'tabler-react'

import { Card, CardBody, CardHeader, CardTitle, CardOptions } from 'ui'

import * as PostActions from '../../redux/action-creators/post'
import { Groups } from './components/Groups'
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

const StickyCard = styled(Card)`
  position: sticky;
  top: 0;
`
