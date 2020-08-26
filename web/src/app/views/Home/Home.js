import React from 'react'
import styled from 'styled-components'

import { Posts } from '../Shared/components/Posts/Posts'

export const Home = () => {
  return (
    <div className="content">
      <div className="left-content col-sm-12 col-lg-8 col-md-12">
        <Posts />
      </div>
      {/* <div className="col-sm-0 col-md-0 col-lg-4">
        <RightPost />
      </div> */}
    </div>
    // <Wrapper>
    //   <Posts />
    // </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 100px;
`
