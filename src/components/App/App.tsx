import React, { FunctionComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from '../AppLayout'
import Routes from 'routing/Routes'

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes />
      </AppLayout>
    </BrowserRouter>
  )
}
