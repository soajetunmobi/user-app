import React, { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { UserContext } from 'providers'

const renderComponent = (component: ReactElement, user: User): ReactNode => {
  return render(
    <UserContext.Provider value={{ user, setUser: user => user }}>{component}</UserContext.Provider>
  )
}

export default renderComponent
