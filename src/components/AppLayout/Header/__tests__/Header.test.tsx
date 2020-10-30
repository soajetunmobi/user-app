import React from 'react'
import renderer from 'react-test-renderer'
import { Header } from '../Header'
import { screen } from '@testing-library/react'
import renderComponent from 'testUtils/helpers/renderComponent'
import { MOCKED_USER } from 'testUtils/mocks/user'

describe('Header', () => {
  it('renders without crashing', () => {
    const root = renderer.create(<Header />).toJSON()
    expect(root).toMatchSnapshot()
  })

  describe('Dynamic links in header section', () => {
    it('should show login link if user is not logged in', () => {
      renderComponent(<Header />, { ...MOCKED_USER, id: '', email: '' })
      expect(screen.getByTestId('login-link')).toBeInTheDocument()
    })

    it('should show logout link if user is logged in', () => {
      renderComponent(<Header />, MOCKED_USER)
      expect(screen.getByTestId('logout-link')).toBeInTheDocument()
    })
  })
})
