import React from 'react'
import renderer from 'react-test-renderer'
import { HomePage } from '../HomePage'
import { screen } from '@testing-library/react'
import renderComponent from 'testUtils/helpers/renderComponent'
import { MOCKED_USER } from 'testUtils/mocks/user'

describe('HomePage', () => {
  it('renders home page', () => {
    const root = renderer.create(<HomePage />).toJSON()
    expect(root).toMatchSnapshot()
  })

  describe('Dynamic content in home page', () => {
    it('should show login link if user is not logged in', () => {
      renderComponent(<HomePage />, { ...MOCKED_USER, id: '', email: '' })
      expect(screen.getByTestId('login-button')).toBeInTheDocument()
      expect(screen.getByTestId('login-welcome')).toBeInTheDocument()
    })

    it('should show welcome text when user is logged in', () => {
      renderComponent(<HomePage />, MOCKED_USER)
      expect(screen.getByTestId('logged-in-welcome')).toBeInTheDocument()
    })

    it('should salute user when logged in', () => {
      renderComponent(<HomePage />, MOCKED_USER)
      expect(screen.getByTestId('logged-in-welcome')).toBeInTheDocument()
      expect(screen.getByText(`Welcome ${MOCKED_USER.first_name}`)).toBeInTheDocument()
    })
  })
})
