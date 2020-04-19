import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { PreloaderContext } from '../../../Preloader'

const isAuthenticated = () => {
  const { isLoggedIn } = useContext(PreloaderContext)
  return isLoggedIn
}

export const PrivateRoute = ({ component, exact, path }) => {
  return <Route exact={exact} path={path} component={withAuth(component)} />
}

const withAuth = WrappedComponent => {
  return () =>
    isAuthenticated() ? <WrappedComponent /> : <Redirect to='/login' />
}
