import React from 'react'
import styled from 'styled-components'

import { ErrorBoundary } from 'ui'

import { Layout } from './Layout'

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
  return props => (
    <NormalLayout {...layoutProps} match={props.match}>
      <WrappedComponent {...props} />
    </NormalLayout>
  )
}

const ContentContainer = styled.div``

const PageContent = styled.div``
