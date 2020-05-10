import React from 'react'
import styled from 'styled-components'

export const ImageViewer = ({ src }) => {
  return (
    <Wrapper>
      <Img className='card-img-top' src={src} />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Img = styled.img`
  max-width: 550px;
  max-height: 550px;
`
