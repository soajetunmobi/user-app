import React, { FunctionComponent, useState } from 'react'
import { useUserContext } from 'providers'
import { LoadingIndicator } from 'components/shared/LoadingIndicator'
import { useHistory } from 'react-router-dom'
import { routes } from 'const/routes'
import { ProfileView } from './ProfileView'
import { ProfileForm } from './ProfileForm'

type viewMode = 'view' | 'edit'

export const ProfilePage: FunctionComponent = () => {
  const { user } = useUserContext()
  const history = useHistory()
  const [currentView, setCurrentView] = useState<viewMode>('view')

  const cancelView = () => {
    history.push(routes.home)
  }

  const cancelEdit = () => {
    setCurrentView('view')
  }

  const editContent = () => {
    setCurrentView('edit')
  }

  if (!user) {
    return <LoadingIndicator />
  }

  return (
    <div>
      {currentView === 'view' && (
        <ProfileView user={user} cancelView={cancelView} editContent={editContent} />
      )}
      {currentView === 'edit' && <ProfileForm user={user} cancelEdit={cancelEdit} />}
    </div>
  )
}
