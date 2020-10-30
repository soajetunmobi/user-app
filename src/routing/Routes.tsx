import React, { FunctionComponent } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'const/routes'
import { HomePage } from 'pages/HomePage'
import { ProfilePage } from 'pages/ProfilePage'
import { LoginPage } from 'pages/LoginPage'
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute'

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path={routes.home} component={HomePage} />
      <PrivateRoute component={ProfilePage} path={routes.profile} exact />
      <Route exact path={routes.login} component={LoginPage} />
      <Redirect to={routes.home} />
    </Switch>
  )
}

export default Routes
