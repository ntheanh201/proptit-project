/* eslint-disable id-length */

import React, { useState, useEffect } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RouterContextProvider, Grid, List, Nav, Button } from 'tabler-react'

import { SiteWrapper, LoadingIndicator } from 'ui'

import User from '../../assets/user.svg'

import logo from '../../assets/ProPTIT.png'

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
    icon: 'users',
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
  },
  {
    value: 'About Us',
    to: '/about',
    icon: 'info',
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
  const { isLogged } = useSelector(state => state.homeReducer)
  const user = JSON.parse(localStorage.getItem('userData'))
  const { displayName, username, id: userId } = user

  const accountDropdownProps = {
    avatarLogo: User,
    avatarURL: '',
    avatarOptions: { width: '32px', height: '32px' },
    name: displayName,
    description: '@' + username,
    options: [
      { icon: 'user', value: 'Profile', to: `/#/profile/${userId}` },
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

  if (!user) {
    return <LoadingIndicator />
  }

  return (
    <SiteWrapper
      headerProps={{
        href: '/',
        alt: 'ProPTIT',
        imageURL: logo,
        navItems: !isLogged ? navItems : null,
        notificationsTray: isLogged
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
        accountDropdown: isLogged ? accountDropdownProps : ''
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
