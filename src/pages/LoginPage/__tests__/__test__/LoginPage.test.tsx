import React from 'react'
import renderer from 'react-test-renderer'
import { LoginPage } from '../../LoginPage'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('LoginPage', () => {
  it('renders LoginPage correctly', () => {
    const root = renderer.create(<LoginPage />).toJSON()
    expect(root).toMatchSnapshot()
  })

  const usernameMock = 'test@gmail.com'
  const passwordMock = 'test'

  describe('Login form submission', () => {
    it('should show helper text', async () => {
      const { getByText } = render(<LoginPage />)
      expect(getByText('Enter username')).toBeInTheDocument()
      expect(getByText('Enter password')).toBeInTheDocument()
    })

    it('submits correct values', async () => {
      const { container } = render(<LoginPage />)
      const username = container.querySelector('input[name="username"]')
      const password = container.querySelector('input[name="password"]')
      await waitFor(() => {
        fireEvent.change(username, { target: { value: usernameMock } })
        fireEvent.change(password, { target: { value: passwordMock } })
      })
      expect(username.value).toBe(usernameMock)
      expect(password.value).toBe(passwordMock)
    })
  })
})
