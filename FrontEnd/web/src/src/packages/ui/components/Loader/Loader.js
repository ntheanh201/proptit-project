import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Loader = () => {
  return (
    <Progress>
      <Container>
        <LoaderWrapper>
          <Dots />
          <Dots />
          <Dots />
          <Dots />
          <Dots />
        </LoaderWrapper>
      </Container>
    </Progress>
  )
}

const Progress = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  display: flex;
  margin: 0;
  cursor: progress !important;
  pointer-events: none !important;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(100% - 4px);
  visibility: hidden;
  z-index: 1100;
`

const LoaderWrapper = styled.div`
  max-width: 600px;
  margin: auto;
`

const move = keyframes`
  0% {
    left: -4px;
    background-color: transparent;
  }
  25%,75% {
    background-color: black;
  }
  100% {
    left: calc(100% + 4px);
    background-color: transparent;
  }
`

const Dots = styled.span`
  display: inline-block;
  position: absolute;
  width: 4px;
  height: 4px;
  animation: ${move} 2.5s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  &:nth-child(2) {
    animation: ${move} 2.5s 100ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  }
  &:nth-child(3) {
    animation: ${move} 2.5s 200ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  }
  &:nth-child(4) {
    animation: ${move} 2.5s 300ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  }
  &:nth-child(5) {
    animation: ${move} 2.5s 400ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  }
`
