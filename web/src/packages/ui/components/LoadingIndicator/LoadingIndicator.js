import React from 'react'
import styled from 'styled-components'

import Loading from '../../assets/loading.svg'

export const LoadingIndicator = () => {
  return (
    <LoadingIndicatorWrapper>
      <Loading width='200' height='200' />
    </LoadingIndicatorWrapper>
  )
}

const LoadingIndicatorWrapper = styled.div`
  display: flex;
  flex: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
