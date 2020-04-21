import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Page, Grid, Icon } from 'tabler-react'

import { Card, CardBody, CardHeader, CardTitle, CardOptions } from 'ui'

import { Groups } from './components/Groups'
import { NewFeeds } from './components/NewFeeds'

const Container = ({ state: props }) => {
  const { isLogged } = useSelector((state) => state.homeReducer)
  const { groups, posts } = props

  return (
    <Page>
      <Page.Main>
        <Grid.Row>
          {isLogged && (
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
