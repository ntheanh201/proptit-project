/* eslint-disable id-length */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { Site, RouterContextProvider } from 'tabler-react'

const navBarItems = [
  {
    value: 'Home',
    to: '/',
    icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true
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
  },
  {
    value: 'Components',
    icon: 'calendar',
    subItems: [
      { value: 'Maps', to: '/maps', LinkComponent: withRouter(NavLink) },
      { value: 'Icons', to: '/icons', LinkComponent: withRouter(NavLink) },
      { value: 'Store', to: '/store', LinkComponent: withRouter(NavLink) },
      { value: 'Blog', to: '/blog', LinkComponent: withRouter(NavLink) }
    ]
  },
  {
    value: 'Pages',
    icon: 'file',
    subItems: [
      { value: 'Profile', to: '/profile', LinkComponent: withRouter(NavLink) },
      { value: 'Login', to: '/login', LinkComponent: withRouter(NavLink) },
      {
        value: 'Register',
        to: '/register',
        LinkComponent: withRouter(NavLink)
      },
      {
        value: 'Forgot password',
        to: '/forgot-password',
        LinkComponent: withRouter(NavLink)
      },
      { value: '400 error', to: '/400', LinkComponent: withRouter(NavLink) },
      { value: '401 error', to: '/401', LinkComponent: withRouter(NavLink) },
      { value: '403 error', to: '/403', LinkComponent: withRouter(NavLink) },
      { value: '404 error', to: '/404', LinkComponent: withRouter(NavLink) },
      { value: '500 error', to: '/500', LinkComponent: withRouter(NavLink) },
      { value: '503 error', to: '/503', LinkComponent: withRouter(NavLink) },
      { value: 'Email', to: '/email', LinkComponent: withRouter(NavLink) },
      {
        value: 'Empty page',
        to: '/empty-page',
        LinkComponent: withRouter(NavLink)
      },
      { value: 'RTL', to: '/rtl', LinkComponent: withRouter(NavLink) }
    ]
  },
  {
    value: 'Forms',
    to: '/form-elements',
    icon: 'check-square',
    LinkComponent: withRouter(NavLink)
  },
  {
    value: 'Gallery',
    to: '/gallery',
    icon: 'image',
    LinkComponent: withRouter(NavLink)
  },
  {
    icon: 'file-text',
    value: 'Documentation',
    to:
      process.env.NODE_ENV === 'production'
        ? 'https://tabler.github.io/tabler-react/documentation'
        : '/documentation'
  }
]

const accountDropdownProps = {
  avatarURL: './demo/faces/female/25.jpg',
  name: 'Nguyen The Anh',
  description: 'Administrator',
  options: [
    { icon: 'user', value: 'Profile' },
    { icon: 'settings', value: 'Settings' },
    { icon: 'mail', value: 'Inbox', badge: '6' },
    { icon: 'send', value: 'Message' },
    { isDivider: true },
    { icon: 'help-circle', value: 'Need help?' },
    { icon: 'log-out', value: 'Sign out' }
  ]
}

export class DefaultNavbar extends React.Component {
  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: 'demo/faces/male/41.jpg',
        message: (
          <Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </Fragment>
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

  render() {
    const notificationsObjects = this.state.notificationsObjects || []
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a || v.unread,
      false
    )
    return (
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: 'Tabler React',
          imageURL: '../../../public/assets/logo.svg',
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
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    v => ({
                      ...v,
                      unread: false
                    })
                  )
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          v => ({
                            ...v,
                            unread: true
                          })
                        )
                      }),
                    5000
                  )
              ),
            unread: unreadCount
          },
          accountDropdown: this.props.isLogin && accountDropdownProps
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
      />
    )
  }
}
