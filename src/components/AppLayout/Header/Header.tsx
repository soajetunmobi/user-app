import React, { FunctionComponent } from 'react'
import { routes } from 'const/routes'
import { useHistory } from 'react-router-dom'
import { useUserContext } from 'providers'

export const Header: FunctionComponent = () => {
  const {
    user: { id, email }
  } = useUserContext()

  const history = useHistory()

  const isUserLoggedIn = (): boolean => {
    return id.length !== 0 && email.length !== 0
  }

  return (
    <div className='header'>
      <div className='logo'>
        <span
          className='cursor--pointer'
          data-testid='logo-link'
          onClick={() => history.push(routes.home)}
        >
          User App
        </span>
      </div>
      <div>
        {!isUserLoggedIn() && (
          <span
            className='cursor--pointer'
            data-testid='login-link'
            onClick={() => history.push(routes.login)}
          >
            Login |{' '}
          </span>
        )}
        {isUserLoggedIn() && (
          <span
            className='cursor--pointer'
            data-testid='logout-link'
            onClick={() => window.location.reload()}
          >
            Logout |{' '}
          </span>
        )}
        <span className='cursor--pointer' onClick={() => history.push(routes.profile)}>
          Profile
        </span>
      </div>
    </div>
  )
}
