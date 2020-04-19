import React, { useContext } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { Page, Grid, Icon } from 'tabler-react'

import { Card, CardBody, CardHeader, CardTitle, CardOptions } from 'ui'

import { PreloaderContext } from '../../Preloader'

import { Groups } from './components/Groups'
import { NewFeeds } from './components/NewFeeds'

const Container = ({ state, setState }) => {
  const { isLoggedIn } = useContext(PreloaderContext)

  const { groups, posts } = state

  return (
    <Page>
      <Page.Main>
        <Grid.Row>
          {isLoggedIn && (
            <Grid.Col lg={4}>
              <StickyCard statusColor='green'>
                <CardHeader>
                  <CardTitle>Các nhóm của bạn</CardTitle>
                  <CardOptions>
                    <Icon link name='settings' />
                  </CardOptions>
                </CardHeader>
                <CardBody>
                  <Groups groups={groups} />
                </CardBody>
              </StickyCard>
            </Grid.Col>
          )}
          <NewFeeds posts={posts} />
        </Grid.Row>
      </Page.Main>
    </Page>
  )
}

export const Home = withRouter(Container)

const StickyCard = styled(Card)`
  position: sticky;
  top: 0;
`
