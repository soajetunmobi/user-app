import renderComponent from 'testUtils/helpers/renderComponent'
import { MOCKED_USER } from 'testUtils/mocks/user'
import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { ProfilePage } from '../ProfilePage'

describe('ProfilePage', () => {
  it('profile page is rendered', () => {
    expect(renderComponent(<ProfilePage />, MOCKED_USER).asFragment()).toMatchSnapshot()
  })

  describe('Profile views', () => {
    it('should render profile view and not edit', () => {
      renderComponent(<ProfilePage />, MOCKED_USER)
      expect(screen.getByTestId('profile-view')).toBeInTheDocument()
      expect(screen.queryByTestId('/profile-edit/i')).not.toBeInTheDocument()
    })

    it('should render profile edit and not view', () => {
      renderComponent(<ProfilePage />, MOCKED_USER)
      const submit = screen.getByTestId('profile-edit-button')
      fireEvent.click(submit)
      expect(screen.getByTestId('profile-edit')).toBeInTheDocument()
      expect(screen.queryByTestId('/profile-view/i')).not.toBeInTheDocument()
    })

    it('should go back to profile view when I click cancel in edit mode', () => {
      renderComponent(<ProfilePage />, MOCKED_USER)
      const editButton = screen.getByTestId('profile-edit-button')
      fireEvent.click(editButton)
      expect(screen.getByTestId('profile-edit')).toBeInTheDocument()
      const cancelButton = screen.getByTestId('profile-cancel-button')
      fireEvent.click(cancelButton)
      expect(screen.getByTestId('profile-view')).toBeInTheDocument()
    })
  })
})
