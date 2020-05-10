import React, {useState} from 'react'
import styled from 'styled-components'

import { ImageView } from 'ui'

export const ImageViewer = ({ src }) => {
  const [showing, setShowing] = useState(false)
  return (
    <Wrapper>
      <Img
        className='card-img-top'
        src={src}
        onClick={() => setShowing(true)}
      />
      {showing && <ImageView img={src} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
    cursor: pointer;
`

const Img = styled.img`
  max-width: 550px;
  max-height: 550px;
`
