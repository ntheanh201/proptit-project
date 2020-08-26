import React from 'react'
import styled from 'styled-components'

import { ErrorBoundary } from 'ui'

import { Layout } from './Layout'
import { Home } from '../../../../app/views/Home/Home'

export const NormalLayout = ({ title = false, children }) => {
  return (
    <ContentContainer>
      <Layout>
        <ErrorBoundary>
          <PageContent>{children}</PageContent>
        </ErrorBoundary>
      </Layout>
    </ContentContainer>
  )
}

export const withNormalLayout = (WrappedComponent, layoutProps) => {
  return (
    // <NormalLayout {...layoutProps} match={props.match}>
    //   <WrappedComponent {...props} />
    // </NormalLayout>
    <Home />
  )
}

const ContentContainer = styled.div``

const PageContent = styled.div``
