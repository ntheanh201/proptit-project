/* eslint-disable id-length */
import React from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'

import { useState } from 'core'

import { RouterContextProvider, Grid, List } from 'tabler-react'
import SiteWrapper from '../SiteWrapper/SiteWrapper'

import User from '../../../assets/user.svg'

const navBarItems = [
  {
    value: 'Home',
    to: '/',
    icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true
  },
  {
    value: 'Demo',
    to: '/demo',
    icon: 'image',
    LinkComponent: withRouter(NavLink)
  },
  {
    value: 'Interface',
    icon: 'box',
    subItems: [
      {
        value: 'Cards Design',
        to: '/cards',
        LinkComponent: withRouter(NavLink)
      },
      { value: 'Charts', to: '/charts', LinkComponent: withRouter(NavLink) },
      {
        value: 'Pricing Cards',
        to: '/pricing-cards',
        LinkComponent: withRouter(NavLink)
      }
    ]
  }
]

const accountDropdownProps = {
  avatarLogo: User,
  avatarURL: '',
  avatarOptions: { width: '32px', height: '32px' },
  name: 'Nguyen The Anh',
  description: '@ntheanh201',
  options: [
    { icon: 'user', value: 'Profile', to: '/user' },
    { icon: 'settings', value: 'Settings' },
    { icon: 'mail', value: 'Inbox', badge: '6' },
    { icon: 'send', value: 'Message' },
    { isDivider: true },
    { icon: 'help-circle', value: 'Need help?' },
    { icon: 'log-out', value: 'Sign out' }
  ]
}

export const Layout = ({ children }) => {
  const initialState = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: 'demo/faces/male/41.jpg',
        message: (
          <React.Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </React.Fragment>
        ),
        time: '10 minutes ago'
      },
      {
        unread: true,
        avatarURL: 'demo/faces/female/1.jpg',
        message: (
          <React.Fragment>
            <strong>Alice</strong> started new task: Tabler UI design.
          </React.Fragment>
        ),
        time: '1 hour ago'
      },
      {
        unread: false,
        avatarURL: 'demo/faces/female/18.jpg',
        message: (
          <React.Fragment>
            <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
          </React.Fragment>
        ),
        time: '2 hours ago'
      }
    ]
  }

  const [state, setState] = useState(initialState)

  const notificationsObjects = state.notificationsObjects || []
  const unreadCount = state.notificationsObjects.reduce(
    (a, v) => a || v.unread,
    false
  )

  return (
    <SiteWrapper
      headerProps={{
        // navItems: (
        //   <Nav.Item type='div' className='d-none d-md-flex'>
        //     <Button
        //       href='https://github.com/tabler/tabler-react'
        //       target='_blank'
        //       outline
        //       size='sm'
        //       RootComponent='a'
        //       color='primary'
        //     >
        //       Source code
        //     </Button>
        //   </Nav.Item>
        // ),
        notificationsTray: {
          notificationsObjects,
          markAllAsRead: () =>
            setState(
              () => ({
                notificationsObjects: state.notificationsObjects.map(v => ({
                  ...v,
                  unread: false
                }))
              }),
              () =>
                setTimeout(
                  () =>
                    setState({
                      notificationsObjects: state.notificationsObjects.map(
                        v => ({ ...v, unread: true })
                      )
                    }),
                  5000
                )
            ),
          unread: unreadCount
        },
        accountDropdown: accountDropdownProps
      }}
      footerProps={{
        copyright: (
          <React.Fragment>
            Copyright © 2020
            <a href='.'> ntheanh201</a>.
          </React.Fragment>
        ),
        nav: (
          <React.Fragment>
            <Grid.Col auto>
              <List className='list-inline list-inline-dots mb-0'>
                <List.Item className='list-inline-item'>
                  <Link to='./faq.html'>FAQ</Link>
                </List.Item>
              </List>
            </Grid.Col>
          </React.Fragment>
        )
      }}
      navProps={{ itemsObjects: navBarItems }}
      routerContextComponentType={withRouter(RouterContextProvider)}
    >
      {children}
    </SiteWrapper>
  )
}
