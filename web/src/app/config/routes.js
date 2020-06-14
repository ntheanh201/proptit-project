import React from 'react'
import loadable from '@loadable/component'
import { LoadingIndicator } from 'ui'
import { Group } from '../views/Groups/Group'

const AsyncPage = loadable(props => import(`../views/${props.component}`), {
  fallback: LoadingIndicator
})

export const routes = [
  {
    path: '/',
    exact: true,
    component: () => <AsyncPage component='Home' />,
    isPrivate: true
  },
  {
    path: '/profile/:id',
    exact: true,
    component: () => <AsyncPage component='ProfilePage' />,
    isPrivate: true
  },
  {
    path: '/profile',
    exact: true,
    component: () => <AsyncPage component='AllAccounts' />,
    title: 'Profile',
    isPrivate: true
  },
  {
    path: '/login',
    exact: true,
    component: () => <AsyncPage component='Login' />,
    withoutNormalLayout: true,
    isPrivate: true
  },
  {
    path: '/logout',
    exact: true,
    component: () => <AsyncPage component='Logout' />,
    withoutNormalLayout: true,
    isPrivate: true
  },
  {
    path: '/groups',
    exact: true,
    component: () => <AsyncPage component='Groups' />,
    isPrivate: true
  },
  {
    path: '/group/:id',
    exact: true,
    component: Group,
    title: 'Group',
    isPrivate: true
  },
  {
    path: '/404',
    exact: true,
    component: () => <AsyncPage component='404' />,
    isPrivate: true
  },
  {
    path: '/about',
    exact: true,
    component: () => <AsyncPage component='AboutUs' />,
    isPrivate: true
  },
  {
    path: '/post/:id',
    exact: true,
    component: () => <AsyncPage component='Post' />,
    isPrivate: true
  }
]
export default routes
