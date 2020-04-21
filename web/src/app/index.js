import React from 'react'
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { withNormalLayout, PrivateRoute } from 'layout'

import { routes } from './config/routes'

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          switch (true) {
            case route.redirect:
              const { redirect, ...props } = route
              return <Redirect key={index} {...props} />
            case route.withoutNormalLayout: {
              const { path, exact = false, component } = route
              return (
                <Route
                  key={index}
                  path={path}
                  exact={exact}
                  component={component}
                />
              )
            }
            case route.isPrivate: {
              const { path, exact = false, title = false, component } = route
              return (
                <PrivateRoute
                  key={index}
                  path={path}
                  exact={exact}
                  component={withNormalLayout(component, { title })}
                />
              )
            }
            default: {
              const { path, exact = false, title = false, component } = route
              return (
                <Route
                  key={index}
                  path={path}
                  exact={exact}
                  component={withNormalLayout(component, { title })}
                />
              )
            }
          }
        })}
        <Redirect to='/404' />
      </Switch>
    </Router>
  )
}

export default App
