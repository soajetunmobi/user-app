import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MOCKED_USER } from 'testUtils/mocks/user'
import { ProfileForm } from '../ProfileForm'

describe('ProfileForm', () => {
  it('profile form is rendered', () => {
    const { asFragment } = render(<ProfileForm user={MOCKED_USER} cancelEdit={jest.fn} />)
    expect(asFragment).toMatchSnapshot()
  })

  describe('Profile form functionality', () => {
    const cancelButtonMock = jest.fn()

    it('should be able to cancel edit', () => {
      render(<ProfileForm user={MOCKED_USER} cancelEdit={cancelButtonMock} />)
      userEvent.click(screen.getByTestId('profile-cancel-button'))
      expect(cancelButtonMock).toHaveBeenCalled()
      expect(cancelButtonMock).toHaveBeenCalledTimes(1)
    })
  })
})
