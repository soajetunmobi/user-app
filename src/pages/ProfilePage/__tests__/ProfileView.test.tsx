import { MOCKED_USER } from 'testUtils/mocks/user'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ProfileView } from '../ProfileView'

describe('ProfileView', () => {
  it('profile view is rendered', () => {
    const { asFragment } = render(
      <ProfileView user={MOCKED_USER} cancelView={jest.fn} editContent={jest.fn} />
    )
    expect(asFragment).toMatchSnapshot()
  })

  describe('Profile view functionality', () => {
    const editButtonMock = jest.fn()
    const cancelButtonMock = jest.fn()

    it('should be able to edit mode', () => {
      render(
        <ProfileView
          user={MOCKED_USER}
          editContent={editButtonMock}
          cancelView={cancelButtonMock}
        />
      )
      userEvent.click(screen.getByTestId('profile-edit-button'))
      expect(editButtonMock).toHaveBeenCalled()
      expect(editButtonMock).toHaveBeenCalledTimes(1)
      expect(cancelButtonMock).not.toHaveBeenCalled()
    })

    it('should be able to cancel viewing', () => {
      render(
        <ProfileView
          user={MOCKED_USER}
          editContent={editButtonMock}
          cancelView={cancelButtonMock}
        />
      )
      userEvent.click(screen.getByTestId('profile-cancel-button'))
      expect(cancelButtonMock).toHaveBeenCalled()
      expect(cancelButtonMock).toHaveBeenCalledTimes(1)
      expect(editButtonMock).not.toHaveBeenCalled()
    })

    it('should see profile information on screen', () => {
      const { queryByTestId } = render(
        <ProfileView
          user={MOCKED_USER}
          editContent={editButtonMock}
          cancelView={cancelButtonMock}
        />
      )
      expect(queryByTestId('profile-firstname')).toContainHTML(MOCKED_USER.first_name)
      expect(queryByTestId('profile-othernames')).toContainHTML(MOCKED_USER.other_names)
    })
  })
})
