import React from 'react'
import styled from 'styled-components'
import Animated, { FadeAnimations } from 'animated-styled-components'

import Loading from '../../assets/loading.svg'

export const LoadingIndicator = () => {
  return (
    <LoadingIndicatorWrapper>
      {/* <Animated
        animation={{
          in: FadeAnimations.FadeInBackwards,
          duration_in: 1
        }}
        transition={{
          type: 'hover',
          from: { property: 'transform', value: 'scale(1) rotate(0)' },
          to: { property: 'transform', value: 'scale(1.2) rotate(25deg)' }
        }}
      > */}
      <Loading width='200' height='200' />
      {/* </Animated> */}
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
`
