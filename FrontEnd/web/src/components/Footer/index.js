/* eslint-disable id-length */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import { withRouter } from 'react-router-dom'

import { Site, Grid, List, RouterContextProvider } from 'tabler-react'

export const Footer = () => {
  return (
    <Site.Wrapper
      footerProps={{
        // links: [
        //   <a href='#'>First Link</a>,
        //   <a href='#'>Second Link</a>,
        //   <a href='#'>Third Link</a>,
        //   <a href='#'>Fourth Link</a>,
        //   <a href='#'>Five Link</a>,
        //   <a href='#'>Sixth Link</a>,
        //   <a href='#'>Seventh Link</a>,
        //   <a href='#'>Eigth Link</a>
        // ],
        // note:
        //   'Premium and Open Source dashboard template with responsive and high quality UI. For Free!',
        copyright: (
          <React.Fragment>
            Copyright © 2020
            <a href='.'> ProPTIT</a>. Theme by
            <a
              href='https://codecalm.net'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              codecalm.net
            </a>{' '}
            All rights reserved.
          </React.Fragment>
        ),
        nav: (
          <React.Fragment>
            <Grid.Col auto>
              <List className='list-inline list-inline-dots mb-0'>
                <List.Item className='list-inline-item'>
                  <a href='./docs/index.html'>Documentation</a>
                </List.Item>
                <List.Item className='list-inline-item'>
                  <a href='./faq.html'>FAQ</a>
                </List.Item>
              </List>
            </Grid.Col>
          </React.Fragment>
        )
      }}
      routerContextComponentType={withRouter(RouterContextProvider)}
    />
  )
}
