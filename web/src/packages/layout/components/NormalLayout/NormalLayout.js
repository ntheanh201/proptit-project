import React from 'react'
import styled from 'styled-components'
import { Page } from 'tabler-react'

import { ErrorBoundary } from 'ui'

import { Layout } from './Layout'

export const NormalLayout = ({
  title = false,
  children
  //   ...props
}) => {
  return (
    <ContentContainer>
      <Layout>
        <ErrorBoundary>
          <Page.Content title={title}>{children}</Page.Content>
        </ErrorBoundary>
      </Layout>
    </ContentContainer>
  )
}

export const withNormalLayout = (WrappedComponent, layoutProps) => {
  return (props) => (
    <NormalLayout {...layoutProps} match={props.match}>
      <WrappedComponent {...props} />
    </NormalLayout>
  )
}

const ContentContainer = styled.div``
