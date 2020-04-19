/* eslint-disable id-length */
import React, { useContext } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'

import { RouterContextProvider, Grid, List, Nav, Button } from 'tabler-react'

import { useState } from 'core'
import { SiteWrapper } from 'ui'

import { PreloaderContext } from '../../../Preloader'
import User from '../../../assets/user.svg'

import logo from '../../../assets/ProPTIT.png'

const navBarItems = [
  {
    value: 'Home',
    to: '/',
    icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true
  },
  {
    value: 'Groups',
    to: '/groups',
    icon: 'cpu',
    LinkComponent: withRouter(NavLink)
  },
  {
    value: 'Gallery',
    to: '/gallery',
    icon: 'image',
    LinkComponent: withRouter(NavLink)
  },
  {
    value: 'ProPTIT Chat Room',
    to: '/chat',
    icon: 'message-circle',
    LinkComponent: withRouter(NavLink)
  }
  // {
  //   value: 'Interface',
  //   icon: 'box',
  //   subItems: [
  //     {
  //       value: 'Cards Design',
  //       to: '/cards',
  //       LinkComponent: withRouter(NavLink)
  //     },
  //     { value: 'Charts', to: '/charts', LinkComponent: withRouter(NavLink) },
  //     {
  //       value: 'Pricing Cards',
  //       to: '/pricing-cards',
  //       LinkComponent: withRouter(NavLink)
  //     }
  //   ]
  // }
]

const Container = ({ history, children }) => {
  const { isLoggedIn, user } = useContext(PreloaderContext)

  const accountDropdownProps = {
    avatarLogo: User,
    avatarURL: '',
    avatarOptions: { width: '32px', height: '32px' },
    name: user.name,
    description: '@' + user.username,
    options: [
      { icon: 'user', value: 'Profile', to: `/#/profile/${user.id}` },
      { icon: 'settings', value: 'Settings', to: '/#/settings' },
      { icon: 'mail', value: 'Inbox', badge: '6', to: '/#/messages' },
      { isDivider: true },
      { icon: 'help-circle', value: 'Need help?', to: '/#/helps' },
      { icon: 'log-out', value: 'Sign out', to: '/#/logout' }
    ]
  }

  const navItems = (
    <Nav.Item type='div' className='d-none d-md-flex'>
      <Button
        onClick={() => history.push({ pathname: '/login' })}
        target='_blank'
        outline
        size='sm'
        RootComponent='a'
        color='primary'
      >
        Login
      </Button>
    </Nav.Item>
  )

  const initialState = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: 'demo/faces/male/41.jpg',
        message: (
          <React.Fragment>
            <strong>Thế Anh</strong> đăng 1 bài viết mới
          </React.Fragment>
        ),
        time: '10 phút trước'
      },
      {
        unread: true,
        avatarURL: 'demo/faces/female/1.jpg',
        message: (
          <React.Fragment>
            <strong>Tiến Hải</strong> đã trả lời bình luận của bạn
          </React.Fragment>
        ),
        time: '1 giờ trước'
      },
      {
        unread: false,
        avatarURL: 'demo/faces/female/18.jpg',
        message: (
          <React.Fragment>
            <strong>Công Khanh</strong> đã bày tỏ cảm xúc về bài viết của bạn
          </React.Fragment>
        ),
        time: '2 giờ trước'
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
        href: '/',
        alt: 'ProPTIT',
        imageURL: logo,
        navItems: !isLoggedIn ? navItems : null,
        notificationsTray: isLoggedIn
          ? {
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
            }
          : null,
        accountDropdown: isLoggedIn ? accountDropdownProps : ''
      }}
      footerProps={{
        copyright: (
          <React.Fragment>
            Copyright © 2020
            <a href='.'> ProPTIT</a>.
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

export const Layout = withRouter(Container)
