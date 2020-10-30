import React, { FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useUserContext } from 'providers'
import { routes } from 'const/routes'

export const PrivateRoute: FunctionComponent<RouteProps> = (props: RouteProps) => {
  const {
    user: { id, email }
  } = useUserContext()

  return id.length !== 0 && email.length !== 0 ? (
    <Route {...props} />
  ) : (
    <Redirect to={routes.login} />
  )
}
