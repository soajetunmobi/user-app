import React, { FunctionComponent } from 'react'
import { useUserContext } from 'providers'
import { LoadingIndicator } from 'components/shared/LoadingIndicator'
import { useHistory } from 'react-router-dom'
import { routes } from 'const/routes'
import { Button } from '@material-ui/core'

export const HomePage: FunctionComponent = () => {
  const { user } = useUserContext()
  const { id, first_name } = user
  const history = useHistory()

  if (!user) {
    return <LoadingIndicator />
  }

  const login = () => {
    history.push(routes.login)
  }

  const renderContent = () => {
    if (id.length == 0) {
      return (
        <div className='text-align--center'>
          <h4 data-testid='login-welcome'>Welcome, please login to access your profile</h4>
          <Button color='primary' data-testid='login-button' onClick={login}>
            Login
          </Button>
        </div>
      )
    }
    return <h4 data-testid='logged-in-welcome'>Welcome {first_name}</h4>
  }

  return <div>{renderContent()}</div>
}
