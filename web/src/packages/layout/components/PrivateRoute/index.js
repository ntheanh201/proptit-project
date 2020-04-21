import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const isAuthenticated = () => {
  const { isLogged } = useSelector((state) => state.homeReducer)
  return isLogged
}

export const PrivateRoute = ({ component, exact, path }) => {
  return <Route exact={exact} path={path} component={withAuth(component)} />
}

const withAuth = (WrappedComponent) => {
  return () =>
    isAuthenticated() ? <WrappedComponent /> : <Redirect to='/login' />
}
