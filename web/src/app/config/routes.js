import React from 'react'
import loadable from '@loadable/component'
import { LoadingIndicator } from 'ui'

const AsyncPage = loadable((props) => import(`../views/${props.component}`), {
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
    isPrivate: true,
    path: '/profile/:id',
    exact: true,
    component: () => <AsyncPage component='ProfilePage' />
  },
  {
    path: '/profile',
    exact: true,
    component: () => <AsyncPage component='AllAccounts' />,
    title: 'Profile'
  },
  {
    path: '/login',
    exact: true,
    component: () => <AsyncPage component='Login' />,
    withoutNormalLayout: true
  },
  {
    path: '/logout',
    exact: true,
    component: () => <AsyncPage component='Logout' />,
    withoutNormalLayout: true
  },
  {
    path: '/groups',
    exact: true,
    component: () => <AsyncPage component='Groups' />,
    title: 'Groups'
  },
  {
    path: '/groups/:id',
    exact: true,
    component: () => <AsyncPage component='GroupPage' />,
    title: 'Group'
  },
  {
    path: '/404',
    exact: true,
    component: () => <AsyncPage component='404' />
  }
]
export default routes
