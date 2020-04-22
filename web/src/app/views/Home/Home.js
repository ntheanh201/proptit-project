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
    const fetchPosts = async () => {
      // await dispatch(PostActions.getAllPosts())
    }
    fetchPosts().then((result) => console.log(result))
  }, [])

  return (
    <Page>
      <Page.Main>
        <Grid.Row>
          <Grid.Col lg={4}>
            <StickyCard statusColor='green'>
              <CardHeader>
                <CardTitle>Các nhóm của bạn</CardTitle>
                <CardOptions>
                  <Icon link name='settings' />
                </CardOptions>
              </CardHeader>
              <CardBody>
                <Groups />
              </CardBody>
            </StickyCard>
          </Grid.Col>
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
